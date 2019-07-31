const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './index3.js',
  mode: 'production', // production development
  target: 'node',
  output: {
    // library: 'SomeLibrary',
    libraryTarget: 'commonjs2', //  "var" | "assign" | "this" | "window" | "self" | "global" | "commonjs" | "commonjs2" | "commonjs-module" | "amd" | "amd-require" | "umd" | "umd2" | "jsonp" | "system"
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({
      terserOptions: {
        ecma: 6,
        compress: true,
        output: {
          comments: false,
          beautify: false
        }
      }
    })]
  }

};