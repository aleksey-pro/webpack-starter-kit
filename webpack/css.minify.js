const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = function(options){
  return {
    plugins: [
      new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: options,
        canPrint: false
      })
    ]
  }
};