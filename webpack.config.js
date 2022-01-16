const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
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
    filename: 'bundle.js',
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
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, './src/template/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCss({
      filename: 'style.css',
    }),
    new CopyPlugin({
      patterns: [
        { from: path.join(__dirname, 'src/static'), to: path.join(__dirname, 'dist/static') },
      ],
    }),
  ],
};
