const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  target: 'node',
  mode: 'production',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        resolve: {
          extensions: ['.css'],
        },
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } }
        ],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_API_ENTRYPOINT: JSON.stringify(process.env.REACT_APP_API_ENTRYPOINT)
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  resolve: {
    extensions: [
      '.js',
      '.css'
    ]
  },
  output: {
    globalObject: 'typeof self !== \'undefined\' ? self : this',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
