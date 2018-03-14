var webpack = require("webpack");
var extractTextWebpackPlugin = require("extract-text-webpack-plugin");
var htmlWebpackPlugin = require("html-webpack-plugin");
var autoprefixer = require('autoprefixer');

var argv = require('minimist')(process.argv.slice(2));

var itemName = process.env.ITEM_NAME || argv["ITEM_NAME"] || "";
var imgUrl = process.env.ITEM_IMG || argv["ITEM_IMG"] || "img";

module.exports = {
    entry: {
        index: ['./src/' + itemName + '/jsx/index.jsx']
    },
    output: {
        path: __dirname + '/src/' + itemName + '/',
        filename: 'js/[name].js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {test: /\.(js|jsx)$/, loader: 'babel'},
            {test: /\.(css|scss)$/, loader: extractTextWebpackPlugin.extract('style', 'css!postcss!sass') },
            {test: /\.(png|gif|jpe?g)$/, loader: 'url-loader?limit=5120&name='+imgUrl+'/[name].[hash:8].[ext]' },
            {test: /\.(eot|ttf|woff2?)$/, loader: 'url-loader?limit=5120&name=fonts/[name].[hash:8].[ext]' },
            {test: /\.svg$/, loader: 'file-loader?name=svg/[name].[hash:8].[ext]' }
        ]
    }, 
    postcss: function () {
        return [autoprefixer];
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.scss', '.json', '.ttf'],
        alias: {
            youyiche: __dirname+'/src/base-common/js/youyiche.js',
            youyicheWX: __dirname+'/src/base-common/js/youyicheWX.js',
            reactComponents:__dirname+'/src/base-common/react-components',
            svgSymbol:__dirname+'/src/base-common/svg/symbol.svg',
            itemConfig: __dirname+'/src/'+ itemName +'/js/itemConfig.js',
        }
    },
    externals: {
        'react': 'React',
        'react-dom': "ReactDOM",
        'react-router': 'ReactRouter'
    },
    plugins: [
        new extractTextWebpackPlugin("css/[name].css"),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: './src/' + itemName + '/index.html',
            inject: true,
            hash: true,
            minify: {
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new webpack.EnvironmentPlugin([
            "NODE_ENV"
        ])
    ]
};
