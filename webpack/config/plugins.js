import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import { ROOT_PATH, SITE_CONFIG } from './vars';

import path from 'path';

export default [
	new webpack.DefinePlugin({
		'BASENAME': `"${SITE_CONFIG.basename}"`,
		'CAMPAIGN_SLUG': `"${SITE_CONFIG.campaignSlug}"`,
		'COUNTRY': `"${SITE_CONFIG.country}"`,
		'DEVELOPMENT': process.env.NODE_ENV !== 'production',
		'process.env': {
			NODE_ENV: JSON.stringify(process.env.NODE_ENV),
		},
	}),

  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'vendor',
  //   minChunks: Infinity,
  //   filename: 'vendor.bundle.js',
  // }),

	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.optimize.DedupePlugin(),

	new ExtractTextPlugin('[name].css'),

  new HtmlWebpackPlugin({
    inject: 'body',
    template: path.resolve(ROOT_PATH, 'src/html/index.html'),
  }),

	new webpack.ProvidePlugin({
		'fetch': 'imports?this=>global!exports?global.fetch!isomorphic-fetch',
	}),
];
