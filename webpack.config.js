const path = require('path');

module.exports = {
  entry: './index3.js',
  mode: 'development', // production
  target: 'node',
  output: {
    // library: 'SomeLibrary',
    libraryTarget: 'commonjs2', //  "var" | "assign" | "this" | "window" | "self" | "global" | "commonjs" | "commonjs2" | "commonjs-module" | "amd" | "amd-require" | "umd" | "umd2" | "jsonp" | "system"
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};