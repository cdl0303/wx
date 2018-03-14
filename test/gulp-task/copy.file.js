'use strict';

var gulp = require('gulp');

module.exports = function(itemName){
	var base = './src/' + itemName;
    return gulp
        .src([base+ '/**/copy/*','!'+base+ '/**/img-src/copy/*'])
        .pipe(gulp.dest('./dist/WxWeb/' + itemName));
}




