const { merge } = require('webpack-merge');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const devServer = require('./webpack/webpack.dev-server');
const resolve = require('./webpack/webpack.resolve');
const { innerModule } = require('./webpack/webpack.module');

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

	new ESLintWebpackPlugin(),
];

if (process.env.SERVE) {
	plugins.push(new ReactRefreshWebpackPlugin());
}
module.exports = merge(devServer, resolve, innerModule(mode), {
	mode,
	plugins,
	target,
	entry: './src/index.jsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		assetModuleFilename: 'assets/[hash][ext][query]',
		clean: true,
		publicPath: '/',
	},
	devtool: mode === 'development' && 'source-map',
});
