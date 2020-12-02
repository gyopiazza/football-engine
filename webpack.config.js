module.exports = {
  mode: 'development',
  entry: ['./client.js'],
  output: {
    filename: "bundle.js",
    path: "/Users/gyo/Works/playground/football-engine/public"
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