const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {

	// Выходной bundle будет минимизирован, и подвергнут оптимизации.
	mode: 'production',

	module: {
		rules: [
			// Правило для локальных стилей, тех что прописаны в наших файлах .css
			{
				test: /\.css$/,
				include: path.join(__dirname, 'src', 'client', 'app'),
				use: [
					// mini-css-extract-plugin собирает стили в один файл, чтобы стили были не инлайновые.
					// Имя файла задается в конструкторе при объявлении плагина (см. ниже).
					// Собранный файл подключается к .html с помощью плагина html-webpack-plugin
					MiniCssExtractPlugin.loader,
					// css-loader позволяет работать с файлами стилей как с модулями.
					// Имена стилей заменяются по шаблону в localIdentName
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[name]__[local]--[hash:base64:5]'
						}
					}
				],
			}
		]
	},

	plugins: [
		// HtmlWebPackPlugin подставляет собранные bundle.js и style.css в наш html файл, применяя шаблон.
		new HtmlWebPackPlugin({
			template: path.join(__dirname, 'src', 'template.html'),
			filename: './index.html'
		}),
		// MiniCssExtractPlugin - css стили будут собраны в один файл styles.css
		new MiniCssExtractPlugin({
			filename: 'styles.css',
		}),
		// Указываем тип разработки для минимизации зависимых модулей и итогового bundle файла.
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		})
	],
});
