const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry: './src/index.js',
	module: {
		rules: [

			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
				use: ['file-loader?name=[name].[ext]']
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			}
		]
	},

	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	},
	output: {
		path: path.resolve(__dirname, 'dist/'),
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('development')
			}),
		new HtmlWebpackPlugin({
				template: './public/index.html',
				favicon: './public/image/favicon.ico',
				manifest: './public/image/manifest.json'
			})
	],

	devServer: {
		contentBase: path.resolve(__dirname, './public'),
		publicPath: '/',
		host: 'localhost',
		port: 3005,
		open: true,
	},
};