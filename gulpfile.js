const gulp = require("gulp"),
  concat = require("gulp-concat"),
  $ = require("gulp-load-plugins")();
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
const replace = require('gulp-replace');
const rename = require("gulp-rename");

// js最小化
const jsmin = require("gulp-jsmin");

gulp.task( 'helper-js', function (done)  {
	gulp.src('src/blocks/faq2/enque-front.js')
	.pipe(jsmin())
	.pipe(rename('vk-faq2.min.js'))
	.pipe(gulp.dest('./inc/vk-blocks/build/'));
	done();
});

gulp.task( 'helper-js-pro', function (done)  {
	gulp.src('src/blocks/_pro/accordion/enque-front.js')
	.pipe(jsmin())
	.pipe(rename('vk-accordion.min.js'))
	.pipe(gulp.dest('./inc/vk-blocks/build/'));
	gulp.src('src/blocks/_pro/animation/enque-front.js')
	.pipe(jsmin())
	.pipe(rename('vk-animation.min.js'))
	.pipe(gulp.dest('./inc/vk-blocks/build/'));
	gulp.src('src/blocks/_pro/slider/enque-front.js')
	.pipe(jsmin())
	.pipe(rename('vk-slider.min.js'))
	.pipe(gulp.dest('./inc/vk-blocks/build/'));
	done();
});

// gulp.task('text-domain', function (done) {
// 	gulp.src(['./inc/term-color/package/*'])
// 	  .pipe(replace(', \'vk_term_color_textdomain\'', ', \'vk-blocks\''))
//     .pipe(gulp.dest('./inc/term-color/package/'));
//   gulp.src(['./inc/vk-components/package/*'])
//     .pipe(replace(', \'vk_components_textdomain\'', ', \'vk-blocks\''))
//     .pipe(gulp.dest('./inc/vk-components/package/'));
//   gulp.src(['./inc/vk-css-optimize/package/*'])
//     .pipe(replace(', \'css_optimize_textdomain\'', ', \'vk-blocks\''))
//     .pipe(gulp.dest('./inc/vk-css-optimize/package/'));
// 	done();
//   });

gulp.task("sass", function() {
  return (
    gulp
			.src(["./src/**/*.scss"])
      .pipe(
        $.plumber({
          errorHandler: $.notify.onError("<%= error.message %>")
        })
      )
      // .pipe($.sourcemaps.init({loadMaps: true}))
      .pipe(
        $.sass({
          errLogToConsole: true,
          outputStyle: "compressed",
          includePaths: ["./src/scss"]
        })
      )
      .pipe($.autoprefixer())
      // .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
      // .pipe($.sourcemaps.write('./map'))
      //bundle css files by gulp-concat
      .pipe(concat("block-build.css"))
      .pipe(gulp.dest("./inc/vk-blocks/build/"))
  );
});

gulp.task("sass_editor", function() {
  return gulp
    .src([
      "./editor-css/_editor_common_core.scss",
      "./editor-css/_editor_before.scss",
      "./editor-css/_editor_after.scss"
    ])
    .pipe(concat("editor-block-build-marge.scss"))
    .pipe(gulp.dest("./editor-css/"))
    .pipe(sass())
    .pipe(cleanCss())
    .pipe(concat("block-build-editor.css"))
    .pipe(gulp.dest("./inc/vk-blocks/build/"));
});

// replace_text_domain
gulp.task("text-domain", function(done) {
	// vk-admin.
	gulp.src(["./inc/vk-admin/package/*.php"])
		.pipe(replace("vk_admin_textdomain","vk-blocks"))
		.pipe(gulp.dest("./inc/vk-admin/package/"));
	// font-awesome.
	gulp.src(["./inc/font-awesome/package/*.php"])
		.pipe(replace("'vk_font_awesome_version_textdomain'", "'vk-blocks'"))
		.pipe(gulp.dest("./inc/font-awesome/package/"));
	// term-color.
	gulp.src(["./inc/term-color/package/*.php"])
		.pipe(replace("'vk_term_color_textdomain'","'vk-blocks'"))
		.pipe(gulp.dest("./inc/term-color/package/"));
	// vk-components.
	gulp.src(["./inc/vk-components/package/*.php"])
		.pipe(replace("'vk_components_textdomain'","'vk-blocks'"))
    .pipe(gulp.dest("./inc/vk-components/package/"));
  gulp.src(["./inc/vk-css-optimize/package/*.php"])
		.pipe(replace("'css_optimize_textdomain'","'vk-blocks'"))
		.pipe(gulp.dest("./inc/vk-css-optimize/package/"));
	done();
});

// VK Block で使用しているBootstrapのみコンパイル
// ※ Lightning 以外のテーマで利用の際に読込
gulp.task("sass_bootstrap", function() {
  return gulp
    .src(["./lib/bootstrap/scss/bootstrap.scss"])
    .pipe(sass())
    .pipe(cleanCss())
    .pipe(concat("bootstrap_vk_using.css"))
    .pipe(gulp.dest("./inc/vk-blocks/build/"));
});

// VK Block で使用しているBootstrapのみコンパイル
// ※ Lightning 以外のテーマで利用の際に読込
gulp.task("sass_vk_components", function() {
  return gulp
    .src(["./inc/vk-components/package/_scss/*.scss"])
    .pipe(sass())
    .pipe(cleanCss())
    .pipe(concat("vk-components.css"))
    .pipe(gulp.dest("./inc/vk-blocks/build/"));
});

// watch
gulp.task("watch", function() {
  gulp.watch("editor-css/_editor_before.scss", gulp.parallel("sass_editor"));
  // gulp.watch("editor-css/*.scss", gulp.parallel("sass_editor"));
  gulp.watch("src/**/*.scss", gulp.series("sass", "sass_editor"));
  gulp.watch(
    "lib/bootstrap/scss/*.scss",
    gulp.parallel("sass_bootstrap", "sass_editor")
  );
  gulp.watch(
    "inc/vk-components/**/*.scss",
    gulp.parallel("sass_vk_components", "sass_editor")
	);
});

//Build : Development
gulp.task("build:dev:free", gulp.series( "text-domain", "sass", "helper-js", "sass_editor","sass_bootstrap","sass_vk_components"));
gulp.task("build:dev:pro", gulp.series( "text-domain", "sass", "helper-js", "helper-js-pro", "sass_editor","sass_bootstrap","sass_vk_components"));

// Build : Production
gulp.task("build:free", gulp.series( "text-domain", "sass", "helper-js", "sass_editor","sass_bootstrap","sass_vk_components"));
gulp.task("build:pro", gulp.series( "text-domain", "sass", "helper-js", "helper-js-pro", "sass_editor","sass_bootstrap","sass_vk_components"));

// Default Tasks
gulp.task("default", gulp.series("watch"));

// copy dist ////////////////////////////////////////////////

gulp.task("dist", function() {
  return gulp
    .src(
      [
        "./**/*.php",
        "./**/*.txt",
        "./**/*.css",
        "./**/*.scss",
        "./**/*.bat",
        "./**/*.rb",
        "./**/*.eot",
        "./**/*.svg",
        "./**/*.ttf",
        "./**/*.woff",
        "./**/*.woff2",
        "./**/*.otf",
        "./**/*.less",
        "./**/*.png",
        "./inc/**",
				"./src/**",
        "!./compile.bat",
        "!./config.rb",
        "!./tests/**",
        "!./dist/**",
				"!./test/**",
        "!./bin/**",
        "!./editor-css/**",
        "!./node_modules/**"
      ],
      { base: "./" }
    )
    .pipe(gulp.dest("dist/vk-blocks-pro")); // distディレクトリに出力
});

gulp.task("dist_ex", function() {
  return gulp
    .src(["./inc/vk-blocks/**"], { base: "./inc/vk-blocks/" })
    .pipe(gulp.dest("../vk-all-in-one-expansion-unit/inc/vk-blocks/package")); // distディレクトリに出力
});
