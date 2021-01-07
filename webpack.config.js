const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: './src/client.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/'
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            configFile: false,
            presets: ['@babel/preset-env', 'solid'],
            plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-object-rest-spread'],
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}

module.exports = config


// module.exports = {
//   mode: 'development',
//   entry: ['./src/client.js'],
//   output: {
//     filename: "bundle.js",
//     path: "/Users/gyo/Works/football-engine/public"
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /(node_modules)/,
//         use: {loader: 'babel-loader'}
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader']
//       }
//     ]
//   }
// }