const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

exports.default = {
	devtool: "source-map",
	entry: "./src/index.js",
	output: {
		path: path.join(__dirname, "./dist"),
		filename: "index.js",
		sourceMapFilename: "dist/index.js.map",
		umdNamedDefine: true,
		libraryTarget: "umd",
		library: "reusable-components",
		globalObject: "this",
	},
	optimization: {
		minimize: false,
	},
	plugins: [
		new ProgressBarPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.js?$/,
				loader: "babel-loader",
				query: {
					cacheDirectory: true,
					presets: [
						[
							"@babel/preset-env",
							{
								targets: {
									browsers: [
										"last 2 versions",
										"not safari < 11",
										"not ie < 11",
									],
								},
							},
						],
						"@babel/preset-react",
					],
					plugins: ["@babel/plugin-proposal-class-properties"],
				},
			},
			{
				test: /\.(jpg|png|gif)$/,
				loader: "file-loader?name=images/[name].[ext]",
			},
			{
				test: /\.s?[ca]ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
					},
					{
						loader: "resolve-url-loader",
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
						},
					},
				],
			},
		],
	},
	resolve: {
		modules: ["node_modules", "./src"],
		extensions: [".js", ".jsx"],
	},
	externals: {
		react: "commonjs react",
		"react-dom": "commonjs react-dom",
		"prop-types": "commonjs prop-types",
	},
};