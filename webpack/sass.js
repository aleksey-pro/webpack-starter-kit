module.exports = function(paths) {
  return {
    module: {
      rules: [{
        test: /\.scss$/,
        include: paths,
        use: [
          'style-loader',//добавляет стили в ДОМ лерева через тег style
          'css-loader', // добавляет стили в граф зависимостей
          'sass-loader', // sass в css
        ],
      },
      ],
    },
  };
};