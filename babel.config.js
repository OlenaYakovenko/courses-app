const plugins = [];
let development = false;
if (process.env.NODE_ENV === 'development') {
	plugins.push('react-refresh/babel');
	development = true;
}

module.exports = {
	presets: [
		'@babel/preset-env',
		['@babel/preset-react', { development, runtime: 'automatic' }],
	],
	plugins,
};
