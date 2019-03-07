import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;
const environment = production ? 'production' : 'development';

export default [
    {
        input: 'src/app/main.js',
        output: {
            file: 'dist/app.js',
            format: 'iife',
            sourcemap: true,
        },
        plugins: [
            postcss({
                extract: true,
                plugins: [autoprefixer()],
            }),
            resolve({
                browser: true,
                extensions: ['.mjs', '.js', '.jsx', '.json'],
            }), // tells Rollup how to find date-fns in node_modules
            replace({
                'process.env.NODE_ENV': JSON.stringify(environment),
            }),
            buble({
                jsx: 'h',
            }),
            commonjs(), // converts date-fns to ES modules
            production && terser(), // minify, but only in production
        ],
    },
    {
        input: 'src/web-worker/main.js',
        output: {
            file: 'dist/web-worker.js',
            format: 'cjs',
        },
        plugins: [buble(), production && terser()],
    },
];
