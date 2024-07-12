// Native Depedencies.
const path = require('path');

// Third-Party Dependencies.
const CopyPlugin = require('@wordpress/scripts/node_modules/copy-webpack-plugin');

const default_config_path = require.resolve('@wordpress/scripts/config/webpack.config.js');

/**
 * Retrieves a new instance of `@wordpress/scripts`' default webpack configuration object.
 * @returns WebpackOptions
 */
const getBaseConfig = () => {
	// If the default config's already been imported, clear the module from the cache so that Node
	// will interpret the module file again and provide a brand new object.
	if (require.cache[default_config_path])
		delete require.cache[default_config_path];

	// Import a new instance of the default configuration object.
	return require(default_config_path);
};

/**
* Returns the result of executing a callback function provided with a new default configuration
* instance.
*
* @param {buildConfig~callback} callback
* @returns WebpackOptions The modified or replaced configuration object.
*/
const buildConfig = (callback) => callback(getBaseConfig());

const replaceCopyPlugin = (plugin, replaceWith) => {
	if (plugin instanceof CopyPlugin) {
		plugin = replaceWith
	}
	return plugin;

}

/**
 * Extends `@wordpress/scripts`'s default webpack config to build block sources from a common
 * `./src/blocks` directory and output built assets to a common `./build/blocks` directory.
 *
 * @param {string} block_name
 * @returns WebpackOptions A configuration object for this block.
 */
const buildBlockConfig = (block_name) => buildConfig(
	config => (
		{ // Copy all properties from the base config into the new config, then override some.
			...config,
			// Override the block's "index" entry point to be `./src/blocks/{block name}/index.js`.
			entry: {
				index: path.resolve(process.cwd(), 'src', 'blocks', block_name, 'index.js'),
			},
			// This block's built assets should be output to `./build/blocks/{block name}/`.
			output: {
				...config.output,
				path: path.resolve(config.output.path, 'blocks', block_name),
			},
			// Add a CopyWebpackPlugin to copy over the `block.json` file.
			plugins: config.plugins.map((plugin) => replaceCopyPlugin(plugin, new CopyPlugin(
				{
					patterns: [
						{ from: `src/blocks/${block_name}/block.json` },
					],
				})
			))
		}
	)
);
module.exports = [
	buildBlockConfig('intelli-builder'),
	buildBlockConfig('visibilty-settings'),
	// Setup a configuration to build `./src/admin-settings/` to `./build/admin-settings/`
	buildConfig(
		config => (
			{
				...config,
				entry: {
					index: path.resolve(process.cwd(), 'src', 'admin-settings', 'index.jsx'),
				},
				output: {
					...config.output,
					path: path.resolve(config.output.path, 'admin-settings'),
				},
				plugins: config.plugins.map((plugin) => replaceCopyPlugin(plugin, null))
			}
		)
	)
];


//   module.exports = {
// 	...defaultConfig,
// 	entry: {
// 		intelli_builder_block: path.resolve(__dirname, 'src/js/blocks/intelli-builder/index.js'),
// 		admin: path.resolve(__dirname, 'src/js/admin-settings/index.js'),
// 	},
// 	output: {
// 		path: path.resolve(__dirname, 'build'),
// 		filename: '[name].min.js',
// 		publicPath: '../../',
// 		assetModuleFilename: 'images/[name][ext][query]',
// 	},
// 	resolve: {
// 		extensions: ['.js', '.jsx'],
// 	},
// 	module: {
// 		rules: [
// 			...defaultConfig.module.rules,
// 			{
// 				test: /\.(js|jsx)$/,
// 				exclude: /node_modules/,
// 				use: 'babel-loader',
// 			},
// 			{
// 				test: /\.(css|scss)$/,
// 				exclude: /node_modules/,
// 				use: [
// 					MiniCssExtractPlugin.loader,
// 					'css-loader',
// 					'sass-loader',
// 				],
// 			},
// 			{
// 				test: /\.svg/,
// 				type: 'asset/inline',
// 			},
// 			{
// 				test: /\.(png|jpg|gif)$/,
// 				type: 'asset/resource',
// 				generator: {
// 					filename: 'images/[name][ext][query]',
// 				},
// 			},
// 			{
// 				test: /\.(woff|woff2|eot|ttf|otf)$/,
// 				type: 'asset/resource',
// 				generator: {
// 					filename: 'fonts/[name][ext][query]',
// 				},
// 			},
// 		],
// 	},
// 	plugins: [
// 		...defaultConfig.plugins,
// 		new CleanWebpackPlugin(),
// 		new MiniCssExtractPlugin({
// 			filename: '../css/[name].min.css',
// 		}),
// 	],
// 	optimization: {
// 		minimize: true,
// 		minimizer: [
// 			new TerserPlugin({
// 				terserOptions: {
// 					format: {
// 						comments: false,
// 					},
// 				},
// 				extractComments: false,
// 			}),
// 		],
// 	},
// };