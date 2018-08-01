const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const path = require('path');

module.exports = merge(common, {

	// Конфиг для webpack-dev-server. В contentBase указывается путь, который будет доступен по http://localhost:port
	// Команда на запуск сервера прописана в package.json: `npm run start`
	devServer: {
		contentBase: path.join(__dirname, 'src', 'dev'),
		compress: true,
		port: 9000,
	},

	module: {
		rules: [
			// Правило для локальных стилей, тех что прописаны в наших файлах .css
			{
				test: /\.css$/,
				include: path.join(__dirname, 'src', 'app'),
				use: [
					// style-loader собирает все стили в head выходного html файла.
					'style-loader',
					// css-loader позволяет работать с файлами стилей как с модулями.
					// Имена стилей заменяются по шаблону в localIdentName
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[name]__[local]--[hash:base64:5]'
						}
					}
				]
			}
		]
	}
});
