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
gulp.task('text-domain-pro', (done) => {
	// vk-components.
	gulp.src(['./inc/vk-components/package/*.php'])
		.pipe(replace("'vk_components_textdomain'", "'vk-blocks'"))
		.pipe(gulp.dest('./inc/vk-components/package/'));
	done();
});

// replace_text_domain
gulp.task('text-domain-free', (done) => {
	// vk-components.
	gulp.src(['./inc/vk-components/package/*.php'])
		.pipe(replace("'vk_components_textdomain'", "'vk-blocks'"))
		.pipe(gulp.dest('./inc/vk-components/package/'));
	gulp.src(['./inc/**',])
		.pipe(replace(/__\(\s*?(['"`].*?['"`]),\s*?['"`]vk-blocks-pro['"`]\s*?\)/gm, "__( $1, 'vk-blocks' )"))
		.pipe(replace(/_e\(\s*?(['"`].*?['"`]),\s*?['"`]vk-blocks-pro['"`]\s*?\)/gm, "_e( $1, 'vk-blocks' )"))
		.pipe(replace(/_n_noop\(\s*?(['"`].*?['"`]),\s*?(['"`].*?['"`]),\s*?['"`]vk-blocks-pro['"`]\s*?\)/gm, "_n_noop( $1, $2, 'vk-blocks' )"))
		.pipe(replace(/_x\(\s*?(['"`].*?['"`]),\s*?(['"`].*?['"`]),\s*?['"`]vk-blocks-pro['"`]\s*?\)/gm, "_x( $1, $2, 'vk-blocks' )"))
		.pipe(replace("$vk_blocks_components_textdomain = 'vk-blocks-pro';", "$vk_blocks_components_textdomain = 'vk-blocks';"))
		.pipe(replace("wp_set_script_translations( 'vk-blocks-admin-js', 'vk-blocks-pro', VK_BLOCKS_DIR_PATH . 'languages' );", "wp_set_script_translations( 'vk-blocks-admin-js', 'vk-blocks' );"))
		.pipe(replace("wp_set_script_translations( 'vk-blocks-build-js', 'vk-blocks-pro', VK_BLOCKS_DIR_PATH . 'languages' );", "wp_set_script_translations( 'vk-blocks-build-js', 'vk-blocks' );"))
		.pipe(gulp.dest('./inc/'));
	gulp.src(['./src/**'])
		.pipe(replace(/__\(\s*?(['"`].*?['"`]),\s*?['"`]vk-blocks-pro['"`]\s*?\)/gm, "__( $1, 'vk-blocks' )"))
		.pipe(replace(/_e\(\s*?(['"`].*?['"`]),\s*?['"`]vk-blocks-pro['"`]\s*?\)/gm, "_e( $1, 'vk-blocks' )"))
		.pipe(replace(/_n_noop\(\s*?(['"`].*?['"`]),\s*?(['"`].*?['"`]),\s*?['"`]vk-blocks-pro['"`]\s*?\)/gm, "_n_noop( $1, $2, 'vk-blocks' )"))
		.pipe(replace(/_x\(\s*?(['"`].*?['"`]),\s*?(['"`].*?['"`]),\s*?['"`]vk-blocks-pro['"`]\s*?\)/gm, "_x( $1, $2, 'vk-blocks' )"))
		.pipe(replace('"textdomain": "vk-blocks-pro"', '"textdomain": "vk-blocks"'))
		.pipe(gulp.dest('./src/'));
	gulp.src(['./test/**'])
		.pipe(replace(/__\(\s*?(['"`].*?['"`]),\s*?['"`]vk-blocks-pro['"`]\s*?\)/gm, "__( $1, 'vk-blocks' )"))
		.pipe(replace(/_e\(\s*?(['"`].*?['"`]),\s*?['"`]vk-blocks-pro['"`]\s*?\)/gm, "_e( $1, 'vk-blocks' )"))
		.pipe(replace(/_n_noop\(\s*?(['"`].*?['"`]),\s*?(['"`].*?['"`]),\s*?['"`]vk-blocks-pro['"`]\s*?\)/gm, "_n_noop( $1, $2, 'vk-blocks' )"))
		.pipe(replace(/_x\(\s*?(['"`].*?['"`]),\s*?(['"`].*?['"`]),\s*?['"`]vk-blocks-pro['"`]\s*?\)/gm, "_x( $1, $2, 'vk-blocks' )"))
		.pipe(gulp.dest('./test/'));
	gulp.src(['./vk-blocks.php'])
		.pipe(replace(/__\(\s*?(['"`].*?['"`]),\s*?['"`]vk-blocks-pro['"`]\s*?\)/gm, "__( $1, 'vk-blocks' )"))
		.pipe(replace(/_e\(\s*?(['"`].*?['"`]),\s*?['"`]vk-blocks-pro['"`]\s*?\)/gm, "_e( $1, 'vk-blocks' )"))
		.pipe(replace(/_n_noop\(\s*?(['"`].*?['"`]),\s*?(['"`].*?['"`]),\s*?['"`]vk-blocks-pro['"`]\s*?\)/gm, "_n_noop( $1, $2, 'vk-blocks' )"))
		.pipe(replace(/_x\(\s*?(['"`].*?['"`]),\s*?(['"`].*?['"`]),\s*?['"`]vk-blocks-pro['"`]\s*?\)/gm, "_x( $1, $2, 'vk-blocks' )"))
		.pipe(replace("Text Domain: vk-blocks-pro", "Text Domain: vk-blocks"))
		.pipe(gulp.dest('./'));
	done();
});

gulp.task('helper-js', (done) => {
	gulp.src('src/blocks/faq2/view.js')
		.pipe(uglify())
		.pipe(rename('vk-faq2.min.js'))
		.pipe(gulp.dest('./build/'));
	gulp.src('src/blocks/slider/view.js')
		.pipe(uglify())
		.pipe(rename('vk-slider.min.js'))
		.pipe(gulp.dest('./build/'));
	done();
});

gulp.task('helper-js-pro', (done) => {
	gulp.src('src/blocks/_pro/accordion/view.js')
		.pipe(uglify())
		.pipe(rename('vk-accordion.min.js'))
		.pipe(gulp.dest('./build/'));
	gulp.src('src/blocks/_pro/animation/view.js')
		.pipe(uglify())
		.pipe(rename('vk-animation.min.js'))
		.pipe(gulp.dest('./build/'));
	gulp.src('src/blocks/_pro/breadcrumb/view.js')
		.pipe(uglify())
		.pipe(rename('vk-breadcrumb.min.js'))
		.pipe(gulp.dest('./build/'));
	gulp.src('src/blocks/_pro/fixed-display/view.js')
		.pipe(uglify())
		.pipe(rename('vk-fixed-display.min.js'))
		.pipe(gulp.dest('./build/'));
	gulp.src('src/blocks/_pro/tab/view.js')
		.pipe(uglify())
		.pipe(rename('vk-tab.min.js'))
		.pipe(gulp.dest('./build/'));
	gulp.src('src/blocks/_pro/table-of-contents-new/view.js')
		.pipe(uglify())
		.pipe(rename('vk-table-of-contents-new.min.js'))
		.pipe(gulp.dest('./build/'));
	gulp.src('src/blocks/_pro/post-list-slider/view.js')
		.pipe(uglify())
		.pipe(rename('vk-post-list-slider.min.js'))
		.pipe(gulp.dest('./build/'));
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
		.pipe(gulp.dest('./build/'));
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
		.pipe(gulp.dest('./build/'));
	done();
});

// vk_blocks_options管理画面 css
gulp.task('sass_vk_blocks_options', (done) => {
	gulp.src(['./options-css/*.scss'])
		.pipe(
			sass({
				errLogToConsole: true,
				outputStyle: 'compressed',
			})
		)
		.pipe(autoprefixer())
		.pipe(concat('vk_blocks_options.css'))
		.pipe(gulp.dest('./build/'));
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
		.pipe(gulp.dest('./build/'));
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
		.pipe(gulp.dest('./build/'));
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
	gulp.src('./src/blocks/_pro/**/*.scss')
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
	gulp.watch(
		'options-css/*.scss',
		gulp.parallel('sass_vk_blocks_options')
	);
});

//Build : Development
gulp.task(
	'build:dev:free',
	gulp.series(
		'text-domain-free',
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
		'text-domain-pro',
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
		'text-domain-free',
		'sass',
		'helper-js',
		'sass_editor',
		'sass_vk_blocks_options',
		'sass_bootstrap',
		'sass_vk_components',
		'sass-separate-free'
	)
);
gulp.task(
	'build:pro',
	gulp.series(
		'text-domain-pro',
		'sass',
		'helper-js',
		'helper-js-pro',
		'sass_editor',
		'sass_vk_blocks_options',
		'sass_bootstrap',
		'sass_vk_components',
		'sass-separate-free',
		'sass-separate-pro'
	)
);

// Default Tasks
gulp.task('default', gulp.series('watch'));
