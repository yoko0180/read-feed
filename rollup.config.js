import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import size from 'rollup-plugin-size';

export default {
	input: 'index3.js',
	output: {
		sourcemap: false,
		format: 'cjs', // Type of output (amd, cjs, esm, iife, umd)
		name: 'app',
		file: 'dist/bundle.js'
	},
	plugins: [
		size(),
		json(),
		resolve(),
		commonjs(),
		// terser()
	],
};
