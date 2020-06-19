// eslint-disable-next-line no-unused-vars
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackTemplate = require('html-webpack-template');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const config = (env) => ({
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: [/node_modules/, /dist/],
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
        ],
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images',
        },
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      appMountId: 'app',
      title: 'Restaurantalia Admin',
      template: './index.html',
    }),
    new CopyPlugin([
      { from: '_redirects', to: './' },
    ]),
  ],
});

module.exports = config;
