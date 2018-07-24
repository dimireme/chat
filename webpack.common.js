const path = require('path');

module.exports = {

	// Точка входа приложения, по умолчанию принимается ./src/index.js
	entry: ['babel-polyfill', path.join(__dirname, 'src', 'client', 'app', 'index')],

	// Результат сборки
	output: {
		path: path.join(__dirname, 'src', 'client', 'public'),
		filename: 'bundle.js'
	},

	// Выбор стиля source-map файлов.
	devtool: 'source-map',

	// Выходной bundle будет только минимизирован.
	mode: 'development',

	// Какие расширения файлов могут подключаться в проекте через import
	resolve: {
		extensions: ['.js', '.jsx']
	},

	// Правила сборки модулей
	// Для файлов с шаблоном {test} внутри директории {include} использовать {use}
	module: {
		rules: [
			// Babel-loader помогает сборщику проекта читать файлы jsx, чтобы потом получить bundle файл.
			{
				test: /\.jsx?/,
				include: path.join(__dirname, 'src', 'client', 'app'),
				use: 'babel-loader'
			}
		]
	}
};
