'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');

module.exports = function(itemName){
	return gulp
        .src('./dist/WxWeb/' + itemName)
        .pipe(clean());
}




