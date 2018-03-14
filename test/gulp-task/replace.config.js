'use strict';

var gulp = require('gulp');
var replace = require('gulp-replace');

module.exports = function(itemName){
	return gulp
        .src('./dist/WxWeb/' + itemName + '/*.html')
        .pipe(replace('js/environmentConfig.js', '/WxWeb/environmentConfig.js'))
        .pipe(gulp.dest('./dist/WxWeb/' + itemName + '/'));
}




