const path = require('path');

const resolve = {
	extensions: ['.js', '.jsx'],
	modules: [path.resolve(__dirname, '../src'), 'node_modules'],
};

module.exports = { resolve };
