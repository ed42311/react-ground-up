const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  dist: path.resolve(__dirname, 'dist'),
  js: path.resolve(__dirname, 'src/js'),
  src: path.resolve(__dirname, 'src')
};

module.exports = {
  entry : path.join(paths.js, 'index.js'),
  output : {
    path : paths.dist,
    filename : "bundle.js",
    publicPath : "/"
  },
  plugins : [
    new HtmlWebpackPlugin({
      template : path.join(paths.src, "index.html"),
    }),
  ],
  module : {
    rules : [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          "babel-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
};
