'use strict';

var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var webpackConfig = require("../webpack.config.js");

try {
	var serverConfig = require("../server.config.js");
} catch(e){
	var serverConfig = null;
}

process.env.NODE_ENV = "dev";

module.exports = function(itemName){
	var compiler,
		server,
		config = Object.create(webpackConfig),
		host = "localhost",
		port = "8080";

	if(serverConfig && serverConfig[itemName]){
		host = serverConfig[itemName].host || host;
		port = serverConfig[itemName].port || port;
	}

	config.entry.index.unshift("webpack-dev-server/client?http://"+host+":"+port+"/", "webpack/hot/dev-server");
	config.devtool= 'cheap-module-eval-source-map';
	config.debug= true;

	config.module.loaders.forEach(function(item){
		if(item.loader=="babel"){
			item.query={
				"presets": ['react-hmre']
			}
		}
	});

	config.plugins = config.plugins.concat(
        new webpack.HotModuleReplacementPlugin()
	);

	compiler = webpack(config);
	server = new webpackDevServer(compiler, {
		"publicPath": config.output.publicPath,
	  	"hot": true,
	  	"stats": { colors: true },
	  	"compress": true,
	  	"progress": true,
	  	"historyApiFallback":true,
	  	"contentBase": "src/"+itemName+"/"
	});
	server.listen(port,host);
}




