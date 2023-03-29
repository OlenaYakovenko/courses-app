const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

let mode = 'development';
let target = 'web';
if (process.env.NODE_ENV === 'production') {
	mode = 'production';
	target = 'browserlist';
}
const CSSModuleLoader = {
	loader: 'css-loader',
	options: {
		modules: {
			auto: true,
			exportLocalsConvention: 'camelCase',
			localIdentName: '[name]_[local]_[hash:base64:5]',
		},
		importLoaders: 1, // 1 => postcss-loader, 2 => postcss-loader, sass-loader
		sourceMap: false, // turned off as causes delay
	},
};

const CSSLoader = {
	loader: 'css-loader',
	options: {
		modules: {
			mode: 'global',
			exportLocalsConvention: 'camelCase',
		},
		importLoaders: 1,
		sourceMap: false, // turned off as causes delay
	},
};

const styleLoader =
	mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader;

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

if (process.env.SERVE) {
	plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
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
	devServer: {
		static: { directory: path.resolve(__dirname, 'public') },
		port: 3000,
		open: true,
		hot: true,
	},
	resolve: { extensions: ['.js', '.jsx'] },
	module: {
		rules: [
			{
				test: /\.html$/,
				use: ['html-loader'],
			},
			{
				test: /\.css$/,
				exclude: /\.module\.(sa|sc|c)ss$/,
				use: [styleLoader, CSSLoader, 'postcss-loader'],
			},
			{
				test: /\.module\.css$/,
				use: [styleLoader, CSSModuleLoader, 'postcss-loader'],
			},
			{
				test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
				type: mode === 'production' ? 'asset' : 'asset/resource',
			},
			{
				test: /\.(woff2?|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.js|jsx$/,
				exclude: /node-modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
					},
				},
			},
		],
	},
};