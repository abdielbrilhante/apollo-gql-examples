const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  return {
    entry: path.join(__dirname, 'index.js'),
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: 'bundle.[fullhash].js',
    },
    module: {
      rules: [
        {
          test: /\.js$/u,
          exclude: /node_modules/u,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public/index.html'),
      }),
    ],
    devServer: {
      contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'public')],
      historyApiFallback: true,
      compress: true,
      port: 8585,
    },
    devtool: isDev && 'eval-source-map',
    optimization: {
      minimize: !isDev,
    },
  };
};
