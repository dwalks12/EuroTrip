/* eslint no-console: 0 */

require('console-stamp')(console, {
	pattern: 'HH:MM:ss.l',
	colors: {
    stamp: 'yellow',
    label: 'blue',
    metadata: 'green',
	},
});

import path from 'path';
import express from 'express';
import logging from 'morgan';
import webpack from 'webpack';
import config from './config/dev';
import chokidar from 'chokidar';
import { exec } from 'child_process';

import { ROOT_PATH, SITE_CONFIG } from './config/vars';

const app = express();
app.use(logging('dev'));

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/public', express.static('public'));

const htmlPath = path.resolve(__dirname, '../web/index.html');

app.get('*', (req, res) => {
        const html = compiler.outputFileSystem.readFileSync(htmlPath).toString('utf8');
        res.send(html);
});

app.listen(SITE_CONFIG.devPort, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${SITE_CONFIG.devPort}`);
});

const rebuildStatic = () => {
  console.log('Rebuilding static files...');
  exec('npm run clean:cache && npm run build:static');
  console.log('Done!');
};

const ignored = [
  /vendor/,
  /~$/,
];

chokidar.watch(path.resolve(ROOT_PATH, 'src/static'), { ignored })
  .on('all', (event, path) => console.log(event, path))
  .on('ready', rebuildStatic)
  .on('change', rebuildStatic)
  .on('unlink', rebuildStatic)
  .on('unlinkDir', rebuildStatic)
;
