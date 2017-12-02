import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import eslint from 'rollup-plugin-eslint';
import { minify } from 'uglify-js';

const isProd = process.env.PROD;
const plugins = [
  eslint(),
  json(),
  babel({
    exclude: 'node_modules/**',
    plugins: ['external-helpers']
  }),
  nodeResolve({ jsnext: true, main: true }),
  commonjs()
];

if (isProd) {
  plugins.push(uglify({}, minify));
}

export default {
  input: 'assets/js/main.js',
  plugins,
  output: {
    file: `dist/bundle.js`,
    format: 'umd'
  },
  sourceMap: !isProd
};
