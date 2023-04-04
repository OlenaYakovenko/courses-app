const path = require('path');

const devServer = {
	static: { directory: path.resolve(__dirname, 'public') },
	port: 3000,
	open: true,
	hot: true,
};

module.exports = { devServer };
