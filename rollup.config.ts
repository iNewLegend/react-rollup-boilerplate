import { RollupOptions } from "rollup";

import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript'
import commonjs from "@rollup/plugin-commonjs";

const extensions = [ '.ts', '.tsx' ],
    external = [],
    globals = {}

const iife: RollupOptions = {
    external,
    input: "src/index.tsx",
    output: {
        globals,
        file: "dist/bundle.js",
        format: "iife",
        sourcemap: true,
    },
    plugins: [
        commonjs(),
        nodeResolve( {
            extensions: [ ".ts", ".tsx" ],
        } ),
        replace( {
            'process.env.NODE_ENV': JSON.stringify( 'development' ),
            preventAssignment: false,
        } ),
        typescript(),
        babel( {
            extensions,
            babelHelpers: 'runtime',
            exclude: '**/node_modules/**',
        } ),
        serve( {
            open: true,
            verbose: true,
            contentBase: [ "", "public" ],
            host: "localhost",
            port: 3000,
        } ),
        livereload( { watch: "dist" } ),
    ]
}

const configs: RollupOptions[] = [ iife ];

export default [ ...configs ];

