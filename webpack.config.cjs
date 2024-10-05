const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (_, argv) => ({
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  experiments: {
    outputModule: true
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  devtool: argv.mode === 'development' ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false
        },
      },
      {
        test: /\.css|s[ac]ss$/i,
        exclude: /node_modules/,
        use: [argv.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff2)$/,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]'
        }
      },
      {
        test: /\.(png|gif|jpg)$/,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]'
        }
      },
      {
        test: /\.(mp3)$/,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
          filename: 'sounds/[name][ext]'
        }
      },
      {
        test: /\.(ts|tsx|js|mjs|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(json)$/,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
          filename: './[name][ext]'
        }
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'UnityWebGL/Bounce Invasors - WebGL'),
          to: path.resolve(__dirname, 'dist/UnityWebGL/Bounce Invasors - WebGL'),
        },
      ],
    }),
  ]
});
