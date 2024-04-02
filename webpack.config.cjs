const path = require('path');
//Plugin para mostrar el html
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//Este plugin sirve para incorporar al dist archivos que no van a encontrarse en el flujo normal de procesamiento
//const copyPlugin = require('copy-webpack-plugin')

//argv permite extraer los parámetros que definimos en el comando de webpack
module.exports = (_, argv) => ({
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  //Especificamos que, en la copilación, nos lo exporte como módulo
  experiments:  {
    outputModule: true
  },
  //Definimos el dev-server
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  //traemos el parámetro mode mediante argv y comprobamos si está en modo development. Si true, genera un source-map
  devtool: argv.mode === 'development' ? 'source-map' : false, 
  module: {
    //Decimos a webpack qué hacer cuando se encuentre algún tipo de archivo específico. Webpack recorrerá todas las reglas
    rules: [
      //Conveniente añadir cuando se trabaja con módulos
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false
        },
      },
      {
        //recorre archivos para aplicar la expresión regular y si coincide, se aplica la regla. 
        test: /\.css|s[ac]ss$/i,
        exclude: /node_modules/,
        use: [ argv.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
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
        test: /\.(json)$/, //Necesitamos que esté en la raíz
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
            filename: './[name][ext]'
          }
      },
    ],
  },
  //Definimos los plugins, creando instancias de los plugins que vayamos usar metiendo su configuración
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
})