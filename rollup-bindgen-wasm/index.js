import { createFilter } from 'rollup-pluginutils';
import { generatedCode } from './generated-code';
import fs from 'fs';

export default function bindgenWasmImport(options = {}) {
    if (!options) throw new Error('Missing options');

    const re = new RegExp(options.pkg, 'g');

    const filter = createFilter(options.include, options.exclude);

    return {/*
        load(id) {
            if (filter(id) && /\.wasm$/.test(id)) {
                return new Promise((resolve, reject) => {
                    fs.readFile(id, (error, buffer) => {
                        if (error != null) {
                            reject(error);
                        }
                        resolve(buffer.toString('binary'));
                    });
                });
            }
            return null;
        },
*/
        transform(code, id) {
            // /\.wasm$/.test(id)
            if (!filter(id) || !re.test(id)) return;
            let ast = null;
            try {
                ast = this.parse(code);
            } catch (err) {
                this.warn({
                    code: 'PARSE_ERROR',
                    message: `rollup-plugin-wasm-bindgen: failed to parse ${id}. Consider restricting the plugin to particular files via options.include`,
                });
            }
            if (!ast) return null;

            //console.log(generatedCode(ast))

            //

            // proceed with the transformation...
            return {
                code: generatedCode(ast),
                map: null,
            };
        },
    };
}
