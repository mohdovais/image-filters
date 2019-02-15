import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;
const environment = production ? 'production' : 'development';

export default [
    {
        input: 'src/main.js',
        output: {
            file: 'dist/app.js',
            format: 'iife',
            name: 'app',
            sourcemap: true,
        },
        plugins: [
            resolve({
                browser: true,
                extensions: ['.mjs', '.js', '.jsx', '.json'],
            }),
            replace({
                'process.env.NODE_ENV': JSON.stringify(environment),
            }),
            buble({
                jsx: 'h',
                objectAssign: 'Object.assign', //'Object.assign'
            }),
            commonjs(), // converts date-fns to ES modules
            //production && terser(), // minify, but only in production
        ],
    },
    {
        input: 'src/web-worker.js',
        output: {
            file: 'dist/web-worker.js',
            format: 'cjs',
        },
        plugins: [
            buble({
                objectAssign: 'Object.assign', //'Object.assign'
            }),
            production && terser(),
        ],
    },
];
