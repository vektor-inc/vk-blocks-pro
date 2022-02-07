const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

// replace_text_domain
gulp.task('text-domain', (done) => {
	// vk-admin.
	gulp.src(['./inc/vk-admin/package/*.php'])
		.pipe(replace("'vk_admin_textdomain'", "'vk-blocks'"))
		.pipe(gulp.dest('./inc/vk-admin/package/'));
	// font-awesome.
	gulp.src(['./inc/font-awesome/package/*.php'])
		.pipe(replace("'vk_font_awesome_version_textdomain'", "'vk-blocks'"))
		.pipe(gulp.dest('./inc/font-awesome/package/'));
	// term-color.
	gulp.src(['./inc/term-color/package/*.php'])
		.pipe(replace("'vk_term_color_textdomain'", "'vk-blocks'"))
		.pipe(gulp.dest('./inc/term-color/package/'));
	// vk-components.
	gulp.src(['./inc/vk-components/package/*.php'])
		.pipe(replace("'vk_components_textdomain'", "'vk-blocks'"))
		.pipe(gulp.dest('./inc/vk-components/package/'));
	gulp.src(['./inc/vk-css-optimize/package/*.php'])
		.pipe(replace("'css_optimize_textdomain'", "'vk-blocks'"))
		.pipe(gulp.dest('./inc/vk-css-optimize/package/'));
	done();
});

gulp.task('helper-js', (done) => {
	gulp.src('src/blocks/faq2/enque-front.js')
		.pipe(uglify())
		.pipe(rename('vk-faq2.min.js'))
		.pipe(gulp.dest('./inc/vk-blocks/build/'));
	done();
});

gulp.task('helper-js-pro', (done) => {
	gulp.src('src/blocks/_pro/accordion/enque-front.js')
		.pipe(uglify())
		.pipe(rename('vk-accordion.min.js'))
		.pipe(gulp.dest('./inc/vk-blocks/build/'));
	gulp.src('src/blocks/_pro/animation/enque-front.js')
		.pipe(uglify())
		.pipe(rename('vk-animation.min.js'))
		.pipe(gulp.dest('./inc/vk-blocks/build/'));
	gulp.src('src/blocks/_pro/slider/enque-front.js')
		.pipe(uglify())
		.pipe(rename('vk-slider.min.js'))
		.pipe(gulp.dest('./inc/vk-blocks/build/'));
	done();
});

gulp.task('sass', (done) => {
	gulp.src(['./src/**/*.scss'])
		.pipe(
			plumber({
				errorHandler: notify.onError('<%= error.message %>'),
			})
		)
		.pipe(
			sass({
				errLogToConsole: true,
				outputStyle: 'compressed',
			})
		)
		.pipe(autoprefixer())
		.pipe(concat('block-build.css'))
		.pipe(gulp.dest('./inc/vk-blocks/build/'));
	done();
});

gulp.task('sass_editor', (done) => {
	gulp.src([
		'./editor-css/_editor_common_core.scss',
		'./editor-css/_editor_before.scss',
		'./editor-css/_editor_after.scss',
	])
		.pipe(concat('editor-block-build-marge.scss'))
		.pipe(gulp.dest('./editor-css/'))
		.pipe(
			sass({
				errLogToConsole: true,
				outputStyle: 'compressed',
			})
		)
		.pipe(autoprefixer())
		.pipe(concat('block-build-editor.css'))
		.pipe(gulp.dest('./inc/vk-blocks/build/'));
	done();
});

// VK Block で使用しているBootstrapのみコンパイル
// ※ Lightning 以外のテーマで利用の際に読込
gulp.task('sass_bootstrap', (done) => {
	gulp.src(['./lib/bootstrap/scss/bootstrap.scss'])
		.pipe(
			sass({
				errLogToConsole: true,
				outputStyle: 'compressed',
			})
		)
		.pipe(autoprefixer())
		.pipe(concat('bootstrap_vk_using.css'))
		.pipe(gulp.dest('./inc/vk-blocks/build/'));
	done();
});

// VK Block で使用しているBootstrapのみコンパイル
// ※ Lightning 以外のテーマで利用の際に読込
gulp.task('sass_vk_components', (done) => {
	gulp.src(['./inc/vk-components/package/_scss/*.scss'])
		.pipe(
			sass({
				errLogToConsole: true,
				outputStyle: 'compressed',
			})
		)
		.pipe(autoprefixer())
		.pipe(concat('vk-components.css'))
		.pipe(gulp.dest('./inc/vk-blocks/build/'));
	done();
});

// ブロックごとのscssそれぞれビルド free
gulp.task('sass-separate-free', (done) => {
	gulp.src('./src/blocks/**/*.scss')
		.pipe(
			sass({
				errLogToConsole: true,
				outputStyle: 'compressed',
			})
		)
		.pipe(autoprefixer())
		.pipe(gulp.dest('./build'));
	// extensions内をビルド
	gulp.src('./src/extensions/**/**/*.scss')
		.pipe(
			sass({
				errLogToConsole: true,
				outputStyle: 'compressed',
			})
		)
		.pipe(autoprefixer())
		.pipe(gulp.dest('./build/extensions'));
	// utils内をビルド
	gulp.src('./src/utils/*.scss')
		.pipe(
			sass({
				errLogToConsole: true,
				outputStyle: 'compressed',
			})
		)
		.pipe(autoprefixer())
		.pipe(gulp.dest('./build/utils'));
	done();
});

// ブロックごとのscssそれぞれビルド pro
gulp.task('sass-separate-pro', (done) => {
	gulp.src('./src/blocks/pro/**/*.scss')
		.pipe(
			sass({
				errLogToConsole: true,
				outputStyle: 'compressed',
			})
		)
		.pipe(autoprefixer())
		.pipe(gulp.dest('./build/pro'));
	done();
});

// watch
gulp.task('watch', () => {
	gulp.watch('editor-css/_editor_before.scss', gulp.parallel('sass_editor'));
	// gulp.watch('editor-css/*.scss', gulp.parallel('sass_editor'));
	gulp.watch('src/**/*.scss', gulp.series('sass', 'sass_editor', 'sass-separate-free', 'sass-separate-pro'));
	//watch enque-front.js
	gulp.watch('src/**/*.js', gulp.series('helper-js', 'helper-js-pro'));
	gulp.watch(
		'lib/bootstrap/scss/*.scss',
		gulp.parallel('sass_bootstrap', 'sass_editor')
	);
	gulp.watch(
		'inc/vk-components/**/*.scss',
		gulp.parallel('sass_vk_components', 'sass_editor')
	);
});

//Build : Development
gulp.task(
	'build:dev:free',
	gulp.series(
		'text-domain',
		'sass',
		'helper-js',
		'sass_editor',
		'sass_bootstrap',
		'sass_vk_components'
	)
);
gulp.task(
	'build:dev:pro',
	gulp.series(
		'text-domain',
		'sass',
		'helper-js',
		'helper-js-pro',
		'sass_editor',
		'sass_bootstrap',
		'sass_vk_components'
	)
);

// Build : Production
gulp.task(
	'build:free',
	gulp.series(
		'text-domain',
		'sass',
		'helper-js',
		'sass_editor',
		'sass_bootstrap',
		'sass_vk_components',
		'sass-separate-free'
	)
);
gulp.task(
	'build:pro',
	gulp.series(
		'text-domain',
		'sass',
		'helper-js',
		'helper-js-pro',
		'sass_editor',
		'sass_bootstrap',
		'sass_vk_components',
		'sass-separate-free',
		'sass-separate-pro'
	)
);

// Default Tasks
gulp.task('default', gulp.series('watch'));

// copy dist ////////////////////////////////////////////////

gulp.task('dist', (done) => {
	gulp.src(
		[
			'./build/**',
			'./inc/**',
			'./src/**',
			'./vendor/**',
			'./*.txt',
			'./*.png',
			'./*.php',
			'!./tests/**',
			'!./dist/**',
			'!./node_modules/**',
		],
		{ base: './' }
	).pipe(gulp.dest('dist/vk-blocks-pro')); // distディレクトリに出力
	done();
});

gulp.task('dist_ex', (done) => {
	gulp.src(['./inc/vk-blocks/**'], { base: './inc/vk-blocks/' }).pipe(
		gulp.dest('../vk-all-in-one-expansion-unit/inc/vk-blocks/package')
	); // distディレクトリに出力
	done();
});
