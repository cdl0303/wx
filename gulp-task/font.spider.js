'use strict';

var gulp = require('gulp');
var fontSpider = require('gulp-font-spider');

module.exports = function(itemName){
	return gulp
        .src('./src/' + itemName + '/webfonts.html')
        .pipe(fontSpider({
            silent: true,
            backup: false
        }));
}




