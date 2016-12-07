import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const assetName = '[path][name]-[hash:base64:10].[ext]';

export default [
  {
    test: /\.jsx?$/,
    loaders: [ 'babel' ],
    exclude: /node_modules/,
    include: path.join(__dirname, '../../src'),
  },

  {
    test: /\.json$/,
    loaders: [ 'json' ],
  },

  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style', 'css?minimize'),
  },

	{
		test: /images\/.*\.(gif|png|jpg|svg)$/,
		loaders: [
			`url?limit=10000&name=${assetName}`,
			'image-webpack?{progressive: true, optimizationLevel: 7, interlaced: true, pngquant:{quality: "65-90", speed: 4}}',
		],
    include: path.join(__dirname, '../../assets'),
	},

	{
		test: /fonts\/.*$/,
		loaders: [ `url?limit=5000&name=${assetName}` ],
    include: path.join(__dirname, '../../assets'),
	},
];
