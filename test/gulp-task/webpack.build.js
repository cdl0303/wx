'use strict';

var webpack = require('webpack');
var gutil = require("gulp-util");
var webpackConfig = require("../webpack.config.js");

process.env.NODE_ENV = "build";

module.exports = function(itemName,callback){
	var config = Object.create(webpackConfig);

	config.output.path = './dist/WxWeb/' + itemName + '/';
    config.output.publicPath = '/WxWeb/' + itemName + '/';

	config.plugins = config.plugins.concat(
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	);

	webpack(config, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack-build]", stats.toString({
			colors: true
		}));
		callback();
    });
}




