'use strict';

var gulp = require('gulp');

module.exports = function(itemName){
	return gulp
        .src('./src/' + itemName + '/fonts/source/*')
        .pipe(gulp.dest('./src/' + itemName + '/fonts/quote/'));
}




