const FaviconWebpackPlugin = require('favicons-webpack-plugin');

module.exports = function() {
  return {
    plugins: [
      new FaviconWebpackPlugin('./source/global/favicon.png')
    ]
  }
};