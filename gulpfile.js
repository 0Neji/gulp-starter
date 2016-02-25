var gulp         = require('gulp'),
	gutil        = require('gulp-util'),
	sass         = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	livereload   = require('gulp-refresh'),
	browserify   = require('browserify'),
	buffer       = require('vinyl-buffer'),
	source       = require('vinyl-source-stream'),
	uglify       = require('gulp-uglify');

var sass_paths         = '_src/sass/**/**.scss',
	css_path           = 'umbraco/assets/css',
	js_src_path        = '_src/js/main.js',
	js_vendor_src_path = '_src/js/vendor.js',
	js_path            = 'umbraco/assets/js';

var sass_options = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};

var on_error = function (error)
{
	gutil.log(gutil.colors.red(error));
	this.emit('end');
};

gulp.task('reload', () => {
	livereload.reload()
})

gulp.task('sass', function () {
	return gulp
		.src(sass_paths)
		.pipe(sass(sass_options)
			.on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest(css_path))
		.pipe(livereload());
});

gulp.task('js', function()
{
	return browserify(js_src_path)
		.bundle()
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(js_path))
		.pipe(livereload());
});

gulp.task('js-vendor', function()
{
	return browserify(js_vendor_src_path)
		.bundle()
		.pipe(source('vendor.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(js_path))
		.pipe(livereload());
});

gulp.task('watch', function()
{
	livereload.listen();
	gulp.watch([js_src_path, '_src/js/scripts/**/*.js'], ['js']);
	gulp.watch([js_vendor_src_path, '_src/js/vendor/**/*.js'], ['js-vendor']);
	gulp.watch(sass_paths, ['sass']);
	gulp.watch('**/*.cshtml', ['reload']);
});

gulp.task('default', ['watch', 'reload']);