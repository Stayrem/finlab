const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const nodeEnv = process.env.NODE_ENV;
const isDevelopment = nodeEnv === 'dev';
const isHome = nodeEnv === 'home';
const dotEnvFile = isHome ? path.join(__dirname, '.env.home') : path.join(__dirname, '.env.amazon');

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: path.resolve(__dirname, './src/index.js'),
  resolve: {
    extensions: ['.ts', '.js', '.jsx', '.tsx', '.scss'],
  },
  devServer: {
    historyApiFallback: true,
    compress: true,
    port: 9000,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/bundle.[contenthash].js',
    publicPath: '/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          MiniCss.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(scss|css)$/,
        include: /node_modules/,
        use: [
          {
            loader: MiniCss.loader,
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Web App',
      template: path.resolve(__dirname, './src/template/index.html'),
      filename: 'templates/index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCss({
      filename: 'static/css/style.[contenthash].css',
    }),
    new Dotenv({
      path: dotEnvFile,
      safe: false,
      allowEmptyValues: true,
    }),
    new CopyPlugin({
      patterns: [
        { from: path.join(__dirname, 'src/static'), to: path.join(__dirname, 'dist/static') },
      ],
    }),
  ],
};
