import path from 'path';

import plugins from './plugins';
import loaders from './loaders';

import { ROOT_PATH } from './vars';

const config = {
	target: 'web',
	devtool: 'eval',

	entry: {
		index: [ './src/index' ],

		// Put necessary important client side dependencies here.
		// Stuff that should be present on every single page load.
		vendor: [
			'aphrodite',
			'babel-polyfill',
			'history',
			'react',
			'react-dom',
			'react-router',
			'scroll-behavior',
			'webfontloader',
		],
	},
	output: {
		path: path.join(ROOT_PATH, './src/html/index.html'),
		filename: '[name].bundle.js',
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		root: [
			path.resolve(ROOT_PATH, './src'),
			path.resolve(ROOT_PATH, './assets'),
		],
	},
	plugins,
	module: { loaders },
};

export default config;
