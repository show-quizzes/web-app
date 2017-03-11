const webpack = require('webpack');
const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const cssPath = (isProd) ? 'css/main.min.css' : 'css/main.css';

module.exports = {
  entry: {
    main: resolve(__dirname, 'client/index.js')
  },
  output: {
		path: resolve(__dirname, 'public/'),
    publicPath: '',
		filename: isProd ? 'js/[name].min.js' : 'js/[name].js'
	},
  devtool: isProd ? 'source-map' : 'eval-source-map',
  module: {
		rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract([ 'css-loader', 'postcss-loader' ])
      },
      {
  			test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: { presets: ['es2015', 'react'] }
  		}
    ]
	},
  plugins: [
    new ExtractTextPlugin(cssPath)
  ]
};
