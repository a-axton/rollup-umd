const json = require('rollup-plugin-json')
const babel = require('rollup-plugin-babel')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const uglify = require('rollup-plugin-uglify').uglify
const eslint = require('rollup-plugin-eslint').eslint
const minify = require('uglify-js').minify
const pkg = require('./package.json')

const isProd = process.env.PROD;
const moduleName = require('./package.json').config.moduleName;
const plugins = [
  eslint(),
  json(),
  babel({
    babelrc: false,
    exclude: 'node_modules/**',
    presets: [['@babel/preset-env', { modules: false }]],
    plugins: ['@babel/plugin-external-helpers'],
    externalHelpers: true
  }),
  nodeResolve({ jsnext: true, main: true }),
  commonjs()
];

if (isProd) {
  plugins.push(uglify({}, minify));
}

export default [
  {
    input: 'src/index.js',
    external: ['ms'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      eslint(),
    ]
  }
]
