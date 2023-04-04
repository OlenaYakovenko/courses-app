/* eslint-disable */
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
	process.env.NODE_ENV !== 'production'
		? 'style-loader'
		: MiniCssExtractPlugin.loader;

if (process.env.SERVE) {
	plugins.push(new ReactRefreshWebpackPlugin());
}

const innerModule = (mode, cssLoader, cssModuleLoader, styleLoaderVar) => ({
	module: {
		rules: [
			{
				test: /\.html$/,
				use: ['html-loader'],
			},
			{
				test: /\.css$/,
				exclude: /\.module\.(sa|sc|c)ss$/,
				use: [styleLoaderVar, cssLoader, 'postcss-loader'],
			},
			{
				test: /\.module\.css$/,
				use: [styleLoaderVar, cssModuleLoader, 'postcss-loader'],
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
});

module.exports = {
	innerModule,
	plugins,
	CSSModuleLoader,
	CSSLoader,
	styleLoader,
};
