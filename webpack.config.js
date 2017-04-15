const path = require('path');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug  = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const webpack = require('webpack');
const lintJS = require('./webpack/js.lint');
const lintCSS = require('./webpack/sass.lint');
const images = require('./webpack/images');
const favicon = require('./webpack/favicon');
const minifyCSS = require('./webpack/css.minify');

const PATHS = {
  source: path.join(__dirname, 'source'),
  build: path.join(__dirname, 'build'),
};
const common = merge([
  {
    entry:  {
      'index': PATHS.source + '/pages/index/index.js',
      'blog': PATHS.source + '/pages/blog/blog.js',
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    devtool: 'eval',
    
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: ['index', 'common'],
        template: PATHS.source + '/pages/index/index.pug',
      }),
      new HtmlWebpackPlugin({
        filename: 'blog.html',
        chunks: ['blog', 'common'],
        template: PATHS.source + '/pages/blog/blog.pug',
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      })
    ]
  },
  pug(),
  lintJS({ paths: PATHS.sources}),
  lintCSS(),
  images()
]);

module.exports = function(env) {
  if (env === 'production') {
    return merge([
      common,
      extractCSS(),
      uglifyJS({useSourceMap: true}),
      minifyCSS({
        options: {
          discardComments: {
            removeAll: true
          },
          safe: true
        }
      }),
      favicon()
    ]);
  }
  if (env === 'development') {
    return merge([
      common,
      devserver(),
      sass(),
      css()
    ]);
  }
};