module.exports = {
  entry: './example/app.js',
  output: {
    path: __dirname + '/example',
    filename: 'bundle.js',
    publicPath: "/example/",
  },
  devtool: "source-map",
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader'},
      {test: /\.css$/, loader: "style-loader!css-loader"},
      {test: /\.scss$/, loaders: ["style", "css?sourceMap", "sass?sourceMap"]}
    ]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
};
