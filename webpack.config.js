const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  dist: path.resolve(__dirname, 'dist'),
  js: path.resolve(__dirname, 'src/js'),
  src: path.resolve(__dirname, 'src')
};

module.exports = {
  entry : "./src/js/index.js",
  output : {
    filename : "./dist/bundle.js"
  },
  plugins : [
    new HtmlWebpackPlugin({
      template : path.join(paths.src, "index.html"),
    }),
  ]
};
