const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './lib/client/js/main.js',
  output: {
    path: path.join(__dirname, './public/js/'),
    filename: 'bundle.min.js'
  },
  // module: {
  //   loaders: [
  //     {
  //       test: /\.js$/,
  //       exclude: /(node_modules)/,
  //       loader: 'babel-loader',
  //       query: {
  //         presets: ['es2015']
  //       }
  //     }
  //   ]
  // },
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: false,
  //     compress: {
  //       warnings: false
  //     }
  //   })
  // ]
}
