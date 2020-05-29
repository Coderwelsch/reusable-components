const path = require("path");

// Export a function. Accept the base config as the only param.
module.exports = async ({ config }) => {
	// `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
	// You can change the configuration based on that.
	// 'PRODUCTION' is used when building the static version of storybook.

	// Make whatever fine-grained changes you need
	config.module.rules.push({
		test: /\.module.s[ac]ss$/,
		loaders: [
			require.resolve("style-loader"),
			{
				loader: require.resolve("css-loader"),
				options: {
					importLoaders: 1,
					modules: {
						mode: "local",
						context: path.resolve(__dirname, "src")
					},
				},
			},
			require.resolve("sass-loader"),
		],
	});

	config.module.rules.push({
		test: /\.sass$/,
		loaders: [
			require.resolve("style-loader"),
			{
				loader: require.resolve("css-loader"),
				options: {
					importLoaders: 1,
					modules: false
				}
			},
			require.resolve("sass-loader"),
		],
		include: path.resolve(__dirname, "../"),
	});

	// Return the altered config
	return config;
};