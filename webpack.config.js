/**
 * Package: YTAHA\IntelliBuilder
 *
 */

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
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
	buildBlockConfig('visibilty-settings')
];
