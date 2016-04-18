'use strict';

let gulp = require('gulp');
require('colors');
let lr = require('tiny-lr')();
let $ = require('gulp-load-plugins')();

gulp.task('dev', ['nodemon']);

gulp.task('nodemon', ['styles', 'js'], (cb) => {
	lr.listen(35729, () => console.log('--->>> Tiny-lr listens on: 35729'.white));

	let started = false;
	$.nodemon({
		script: './bin/www',
		watch: ['*.js', 'bin/www']
	}).on('start', () => {
		//to avoid nodemon being started multiple times
		console.log('--->>> Server started!'.white);
		if (!started) {
			cb();
			started = true;
		}
	}).on('restart', () => console.log('--->>> Server restarted!'.white));

	gulp.watch('./public/*.scss', ['styles']);
	gulp.watch('./public/*.js', ['js']);
	gulp.watch(['public/**'], reloadNotify);
});

gulp.task('styles', () => {
	return gulp.src('./public/*.scss')
		.pipe($.sass())
		.pipe($.autoprefixer({browsers: ['last 2 version']}))
		.pipe($.cssmin())
		.pipe(gulp.dest('./dist'));
});
gulp.task('js', () => {
	return gulp.src('./public/*.js')
		.pipe($.concat('scripts.min.js'))
		.pipe($.uglify())
		.pipe(gulp.dest('./dist'));
});

/**
 ***********************************************
 *	Helper functions
 ***********************************************
 */

function reloadNotify(ev) {
	let fileName = require('path').relative(__dirname, ev.path);

	lr.changed({
		body: {
			files: [fileName]
		}
	});
}