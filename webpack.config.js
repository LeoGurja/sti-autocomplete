const path = require('path');

module.exports = {
  entry: './example/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'test'),
  },
};