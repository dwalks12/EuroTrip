import webpack from 'webpack';
import baseConfig from './base';

import { SITE_CONFIG } from './vars';

const publicPath = `http://localhost:${SITE_CONFIG.devPort}/`;

export default Object.assign({}, baseConfig, {
	entry: {
		...baseConfig.entry,
		index: [
			// necessary for hot reloading with IE:
			'eventsource-polyfill',
			// listen to code updates emitted by hot middleware:
			`webpack-hot-middleware/client?overlay=true&reload=true&path=${publicPath}__webpack_hmr`,
			...baseConfig.entry.index,
		],
	},

	output: {
		...baseConfig.output,
		publicPath,
	},

	plugins: [
		...baseConfig.plugins,
		new webpack.HotModuleReplacementPlugin(),
	],
});
