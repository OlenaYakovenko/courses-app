/*eslint-disable*/
const { merge } = require('webpack-merge');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

const devServer = require('./webpack/webpack.dev-server');
const resolve = require('./webpack/webpack.resolve');
const {
	innerModule,
	CSSModuleLoader,
	CSSLoader,
	styleLoader,
} = require('./webpack/webpack.module');

let mode = 'development';
let target = 'web';
if (process.env.NODE_ENV === 'production') {
	mode = 'production';
	target = 'browserlist';
}
const plugins = [
	new HTMLWebpackPlugin({
		template: './public/index.html',
		filename: 'index.html',
	}),
	new MiniCssExtractPlugin({
		filename: '[name].[contenthash].css',
	}),
	new ESLintWebpackPlugin(),
];
module.exports = merge(
	devServer,
	resolve,
	innerModule(mode, CSSLoader, CSSModuleLoader, styleLoader),
	{
		mode,
		plugins,
		target,
		entry: './src/index.js',
		output: {
			path: path.resolve(__dirname, 'dist'),
			assetModuleFilename: 'assets/[hash][ext][query]',
			clean: true,
		},
		devtool: mode === 'development' && 'source-map',
	}
);
