import { generate } from 'astring';

function investigate(ast) {
    const imports = ast.body.filter(node => node.type === 'ImportDeclaration');

    const wasmImports = ast.body
        .filter(
            node =>
                node.type === 'ExportNamedDeclaration' &&
                /^__/.test(node.declaration.id.name)
        )
        .map(node => node.declaration.id.name);

    const exports = ast.body
        .filter(
            node =>
                node.type === 'ExportNamedDeclaration' &&
                !/^__/.test(node.declaration.id.name)
        )
        .map(node => node.declaration.id.name);

    return {
        importName: imports[0].specifiers[0].local.name,
        importFile: imports[0].source.value,
        wasmImports,
        exports,
    };
}

export function generatedCode(ast) {
    const { importName, importFile, wasmImports, exports } = investigate(ast);

    ast.body.forEach(function(node, index, parent) {
        switch (node.type) {
            case 'ImportDeclaration':
                parent[index] = { type: 'EmptyStatement' };
                break;
            case 'ExportNamedDeclaration':
                parent[index] = node.declaration;
                break;
        }
    });

    return `
let ${importName};

export default function load_wasm() {
    const importObject = {
        './wasm_image_filters': {
            ${wasmImports.join(', ')}
        },
    };

    return fetch('wasm-image-filters/pkg/${importFile}.wasm')
        .then(response => response.arrayBuffer())
        .then(bytes => WebAssembly.instantiate(bytes, importObject))
        .then(results => results.instance.exports)
        .then(function(_wasm) {
            wasm = _wasm;
            return {
                wasm, ${exports.join(', ')}
            };
        });
}

${generate(ast)}
`;
}
