/* eslint no-console: 0 */

import webpack from 'webpack';
import config from './config/prod';

require('console-stamp')(console, 'HH:MM:ss.l');

const compiler = webpack(config);

compiler.run((err) => {
	if (err) {
		console.error(err);
	} else {
		console.log('Build done!');
	}
});
