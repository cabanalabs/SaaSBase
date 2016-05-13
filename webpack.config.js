// We want to create
// a few modules:
// - main.js
// - register.js
// - dashboard.js
// webpack.config.js

const webpack = require('webpack');
const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
  context: __dirname,
  entry: {
    front_desk: './front/client/front_desk',
    dashboard: './front/client/dashboard',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: 'front/public/js',
    filename: '[name].js', // Template based on keys in entry above
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
  plugins: [commonsPlugin],
};
