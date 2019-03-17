/*
 * gulpfile.js
 */

var gulp = require('gulp');
var riot = require('gulp-riot');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify-es').default;
var rename = require('gulp-rename');
var header = require('gulp-header');
var sort = require('gulp-sort');

var pkg = require('./package.json');
var target = ['./src/*.pug', './src/**/*.pug'];
var output = './';

var banner = `
/* 
 * <%= pkg.name %> <%= pkg.version %>
 * <%= pkg.description %>
 * MIT Licensed
 * 
 * Copyright (C) 2016 phi, http://phiary.me
 */

'use strict';

var spat = {
  nav: {},
  modal: {},
  toast: {},
};
`;

gulp.task('riot', function() {
  gulp
    .src(target)
    .pipe(riot({template:'pug'}))
    .pipe(sort())
    .pipe(concat('spat.js'))
    .pipe(header(banner, {
      pkg: pkg,
    }))
    .pipe(gulp.dest(output))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(output))
    ;
});

gulp.task('watch', function(){
  gulp.watch(target, ['riot']);
});

gulp.task('default', ['riot', 'watch']);
