'use strict';
var gulp = require('gulp');
var svgstore = require('./gulp-task/svgstore.js')
var copyFont = require('./gulp-task/copy.font.js');
var copyFile = require('./gulp-task/copy.file.js');
var fontSpider = require('./gulp-task/font.spider.js');
var cleanItem = require('./gulp-task/clean.item.js');
var replaceConfig = require('./gulp-task/replace.config.js');

var argv = require('minimist')(process.argv.slice(2));//获取参数
var itemName = process.env.ITEM_NAME || argv["ITEM_NAME"] || "";//项目名称


//合并生成svg
gulp.task('svgstore', function () {
    svgstore();
});

//复制font文件至引用目录
gulp.task('copy-font', function() {
    copyFont(itemName);
});

//使用字蛛插件处理字体
gulp.task('font-spider', ['copy-font'], function() {
    fontSpider(itemName);
});

//清空上一次相同项目打包后的目录文件
gulp.task('clean-item', function() {
    cleanItem(itemName);
});

//启动webpack开发环境
gulp.task('webpack-dev', ['font-spider','svgstore'], function () {
	var webpackDev = require('./gulp-task/webpack.dev.js');
    webpackDev(itemName);
});

//webpack打包
gulp.task('webpack-build', ['font-spider','svgstore','clean-item'], function (callback) {
    var webpackBuild = require('./gulp-task/webpack.build.js');
    webpackBuild(itemName,callback);
});

//替换webpack打包后的index.html引用的environmentConfig.js地址
gulp.task('replace-config', ['webpack-build'], function() {
    replaceConfig(itemName);
});

//拷贝未经过webpack打包的引用文件
gulp.task('copy-file', ['webpack-build'], function(){
    copyFile(itemName);
})

//侦听svg文件
gulp.task('watch', function() {
	gulp.watch('src/base-common/svg/symbol/*.svg', ['svgstore']);
})

//开发
gulp.task('dev', ['font-spider','svgstore','watch','webpack-dev']);

//打包
gulp.task('build', ['font-spider', 'svgstore', 'clean-item','webpack-build','replace-config','copy-file']);



