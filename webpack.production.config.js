var path = require('path');

var config = {
  // context: path.join(__dirname, 'src'),
  entry: {
    js: ['babel-polyfill', './src/index.js']
  },
  output: {
    path: path.join(__dirname, 'build/test/'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline'
      }
    ]
  }
};

module.exports = config;
