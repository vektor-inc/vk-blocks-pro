var gulp = require('gulp'),
	concat = require("gulp-concat"),
	$ = require('gulp-load-plugins')(),
	webpackStream = require('webpack-stream'),
	webpack = require('webpack'),
	webpackConfig = require('./webpack.config');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
// 同期的に処理してくれる（ distで使用している ）
var runSequence = require('run-sequence');
// js最小化
var jsmin = require('gulp-jsmin');

gulp.task('sass', function () {
	return gulp.src(['./src/**/*.scss'])
		.pipe($.plumber({
			errorHandler: $.notify.onError('<%= error.message %>')
		}))
		// .pipe($.sourcemaps.init({loadMaps: true}))
		.pipe($.sass({
			errLogToConsole: true,
			outputStyle: 'compressed',
			includePaths: [
				'./src/scss'
			]
		}))
		.pipe($.autoprefixer())
		// .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
		// .pipe($.sourcemaps.write('./map'))

		//bundle css files by gulp-concat
		.pipe(concat('block-build.css'))
		.pipe(gulp.dest('./inc/vk-blocks/build/'));
});


gulp.task('sass_editor', function (){
	return gulp.src([ './editor-css/editor.scss_before',  './src/**/*.scss', './editor-css/editor.scss_after'])
		.pipe(concat('editor-block-build.scss'))
		.pipe(gulp.dest('./editor-css/'))
		.pipe(sass())
		.pipe(cleanCss())
		.pipe(concat('block-build-editor.css'))
		.pipe(gulp.dest('./inc/vk-blocks/build/'));
});


// Transpile and Compile Sass and Bundle it.
gulp.task('js', function () {
	return webpackStream(webpackConfig, webpack)
		.pipe(gulp.dest('./'));
});

gulp.task('copy_front_js', function () {
	return gulp.src([ './src/table-of-contents/viewHelper.js'])
		.pipe(jsmin())
		.pipe( gulp.dest( './inc/vk-blocks/build/' ) );
});


// watch
gulp.task('watch', function () {
	gulp.watch('src/**/*.js', ['js','dist_ex','copy_front_js']);
	gulp.watch('editor-css/editor.scss_before', ['sass_editor']);
	gulp.watch('src/**/*.scss', ['sass','sass_editor','dist_ex']);
	// gulp.watch('src/**/*.scss', ['sass']);
});

// Build
gulp.task('build', gulp.series('js', 'sass', 'sass_editor'));

// Default Tasks
gulp.task('default', gulp.series('watch'));


// copy dist ////////////////////////////////////////////////

gulp.task('dist', function() {
	return gulp.src(
		[
			'./**/*.php',
			'./**/*.txt',
			'./**/*.css',
			'./**/*.scss',
			'./**/*.bat',
			'./**/*.rb',
			'./**/*.eot',
			'./**/*.svg',
			'./**/*.ttf',
			'./**/*.woff',
			'./**/*.woff2',
			'./**/*.otf',
			'./**/*.less',
			'./**/*.png',
			'./inc/**',
			"!./compile.bat",
			"!./config.rb",
			"!./tests/**",
			"!./dist/**",
			"!./src/**",
			"!./bin/**",
			"!./editor-css/**",
			"!./node_modules/**"
		],
		{ base: './' }
	)
		.pipe( gulp.dest( 'dist/vk-blocks' ) ); // distディレクトリに出力
} );

gulp.task('dist_ex', function() {
	return gulp.src(
		[
			'./inc/vk-blocks/**',
		],
		{ base: './inc/vk-blocks/' }
	)
		.pipe( gulp.dest( '../vk-all-in-one-expansion-unit/inc/vk-blocks/package' ) ); // distディレクトリに出力
} );
