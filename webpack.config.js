var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'src', 'entry.js');
console.log('using dev');
var config = {
  // Makes sure errors in console map to the correct file
  // and line number
  devtool: 'eval',
  entry: [

    // For hot style updates
    'webpack/hot/dev-server',

    // The script refreshing the browser on none hot updates
    'webpack-dev-server/client?http://localhost:8080',

    // Our application
    mainPath],
  output: {

    // We need to give Webpack a path. It does not actually need it,
    // because files are kept in memory in webpack-dev-server, but an
    // error will occur if nothing is specified. We use the buildPath
    // as that points to where the files will eventually be bundled
    // in production
    path: buildPath,
    filename: 'bundle.js',

    // Everything related to Webpack should go through a build path,
    // localhost:3000/build. That makes proxying easier to handle
    publicPath: '/build/'
  },
  module: {

    loaders: [

    // I highly recommend using the babel-loader as it gives you
    // ES6/7 syntax and JSX transpiling out of the box
    {
      test: /\.js$/,
      loader: 'babel',
      exclude: [nodeModulesPath]
    },

    // Let us also add the style-loader and css-loader, which you can
    // expand with less-loader etc.
    {
      test: /\.css$/,
      loader: 'style!css'
    },
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
    }

    ]
  },
  devServer: {
     historyApiFallback: true
 },

  // We have to manually add the Hot Replacement plugin when running
  // from Node
  plugins: [new Webpack.HotModuleReplacementPlugin()]
};

module.exports = config;

// var path = require('path');
// module.exports = {
//   entry: ['./src/entry.js', 'babel-polyfill'],
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'public/')
//   },
//   devServer:{
//     devServer: {
//     port: 8080,
//     historyApiFallback: {
//       index: 'index.html'
//     }
//   }
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.js$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/
//       },
//       {
//         test: /\.(otf|jpg|png|woff|eot|ttf|svg|woff2)$/,
//         loader: 'file-loader'
//       },
//       { test: /\.(png|jpg|jpeg|gif|woff)$/, loader: 'url?limit=8192' },
//       { test: /\.(otf|eot|ttf)$/, loader: "file?prefix=font/" },
//       {
//         test: /\.css$/,
//         loader: 'style-loader!css-loader',
//       }
//     ]
//   }
// };
