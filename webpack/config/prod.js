import path from 'path';
import webpack from 'webpack';
import { ROOT_PATH, SITE_CONFIG } from './vars';

import baseConfig from './base';

const OUTPUT_FOLDER = process.env.OUTPUT_FOLDER && process.env.OUTPUT_FOLDER.trim() !== ''
	? process.env.OUTPUT_FOLDER
	: 'web';

let config = Object.assign( {}, baseConfig,
	{
		devtool: undefined,

		plugins: [
			...baseConfig.plugins,
			new webpack.optimize.UglifyJsPlugin({ minimize: true }),
		],

		output: {
			...baseConfig.output,
			path: path.join(ROOT_PATH, OUTPUT_FOLDER),
			publicPath: `/${SITE_CONFIG.basename}/`,
		},
	}
);

export default config;
