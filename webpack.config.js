const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	output: {
		filename: 'bundle.[name].js',
		path: path.resolve(__dirname, './docs')
	},

	module: {
		rules: [
			{
				test: /\.(html)$/,
				use: ['html-loader']
			},

			{
				test: /\.css$/,
				use: 
				[
					'style-loader',
					'css-loader'
				]
			},

			{
				test: /\.js$/,
				exclude: '/node_modules/',
				use: ['babel-loader']
			},


			{
				test: /\.(glb|gltf)$/,
				use: 
				[{
					loader: 'file-loader',
					options: 
					{
					outputPath: 'resource/models'
					}
				}]
			},

			{
				test: /\.(png|jpg|svg)$/,
				use: 
				[{
					loader: 'file-loader',
					options:
					{
					outputPath: 'resource/textures'
					}
				}]
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({ 
			template: path.resolve(__dirname, './src/main.html')
		}),
		new CopyWebpackPlugin({
			patterns: [
				{	
					from: path.resolve(__dirname, './resources')
				}
			]
		}),
		new CleanWebpackPlugin(),
	]
};