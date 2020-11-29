module.exports = {
  mode: 'development',
  entry: ['./client.js'],
  output: {
    filename: "bundle.js",
    path: "/app/public"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {loader: 'babel-loader'}
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}