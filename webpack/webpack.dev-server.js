const path = require('path');

const devServer = {
	static: { directory: path.resolve(__dirname, 'public'), publicPath: '/' },
	port: 3000,
	open: true,
	hot: true,
	historyApiFallback: true,
};

module.exports = { devServer };
