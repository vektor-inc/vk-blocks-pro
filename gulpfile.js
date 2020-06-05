const gulp = require("gulp"),
  concat = require("gulp-concat"),
  $ = require("gulp-load-plugins")(),
  webpackStream = require("webpack-stream"),
  webpack = require("webpack"),
  webpackDev = require("./webpack.dev"),
  webpackProd = require("./webpack.prod");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
const replace = require('gulp-replace');

// js最小化
const jsmin = require("gulp-jsmin");

gulp.task('text-domain', function (done) {
	gulp.src(['./inc/term-color/package/*'])
	  .pipe(replace(', \'vk_term_color_textdomain\'', ', \'vk-blocks\''))
	  .pipe(gulp.dest('./inc/term-color/package/'));
	done();
  });

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
      "./editor-css/_editor_before.scss",
      "./src/**/*.scss",
      "./editor-css/_editor_after.scss"
    ])
    .pipe(concat("editor-block-build-marge.scss"))
    .pipe(gulp.dest("./editor-css/"))
    .pipe(sass())
    .pipe(cleanCss())
    .pipe(concat("block-build-editor.css"))
    .pipe(gulp.dest("./inc/vk-blocks/build/"));
});

gulp.task("dist_swiper_js", function() {
  return gulp
    .src(["./lib/swiper/swiper.min.js"])
    .pipe(concat("swiper.min.js"))
    .pipe(gulp.dest("./inc/vk-blocks/build/"));
});

gulp.task("dist_swiper_css", function() {
  return gulp
    .src(["./lib/swiper/swiper.min.css"])
    .pipe(concat("swiper.min.css"))
    .pipe(gulp.dest("./inc/vk-blocks/build/"));
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

// Transpile and Compile Sass and Bundle it.
gulp.task("js-dev", function() {
  return webpackStream(webpackDev, webpack).pipe(gulp.dest("./"));
});

gulp.task("js", function() {
  return webpackStream(webpackProd, webpack).pipe(gulp.dest("./"));
});

// watch
gulp.task("watch", function() {
  gulp.watch("src/**/*.js", gulp.parallel("js"));
//   gulp.watch("src/**/*.js", gulp.parallel("js-dev"));
  gulp.watch("editor-css/_editor_before.scss", gulp.parallel("sass_editor"));
  gulp.watch("editor-css/_editor_before_template_inserter.scss", gulp.parallel("sass_editor"));
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
gulp.task("build-dev", gulp.series("js-dev", "sass", "sass_editor","sass_bootstrap","sass_vk_components", "dist_swiper_js", "dist_swiper_css"));

// Build : Production
gulp.task("build", gulp.series("js", "sass", "sass_editor","sass_bootstrap","sass_vk_components", "dist_swiper_js", "dist_swiper_css"));

// Default Tasks
gulp.task("default", gulp.series("watch"));

// replace_text_domain
gulp.task("replace_text_domain", function(done) {
	// font-awesome.
	gulp.src(["./inc/font-awesome/package/*.php"])
		.pipe(replace("'vk_font_awesome_version_textdomain'", "'vk-blocks'"))
		.pipe(gulp.dest("./inc/font-awesome/package/"));
	// term-color.
	gulp.src(["./inc/term-color/package/*.php"])
		.pipe(replace("'vk_term_color_textdomain'","'vk-blocks'"))
		.pipe(gulp.dest("./inc/term-color/package/"));
	// template-tag.
	gulp.src(["./inc/template-tags/package/*.php"])
		.pipe(replace("'vk-all-in-one-expansion-unit'","'vk-blocks'"))
		.pipe(gulp.dest("./inc/template-tags/package/"));
	// vk-components.
	gulp.src(["./inc/vk-components/package/*.php"])
		.pipe(replace("'vk_components_textdomain'","'vk-blocks'"))
		.pipe(gulp.dest("./inc/vk-components/package/"));
	done();
});

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
        "!./compile.bat",
        "!./config.rb",
        "!./tests/**",
        "!./dist/**",
        "!./src/**",
        "!./bin/**",
        "!./editor-css/**",
        "!./node_modules/**"
      ],
      { base: "./" }
    )
    .pipe(
      gulp.dest(
        "../../../../../../updatepro/app/public/wp-content/plugins/vk-blocks-pro"
      )
    )
    .pipe(gulp.dest("dist/vk-blocks-pro")); // distディレクトリに出力
});

gulp.task("dist_ex", function() {
  return gulp
    .src(["./inc/vk-blocks/**"], { base: "./inc/vk-blocks/" })
    .pipe(gulp.dest("../vk-all-in-one-expansion-unit/inc/vk-blocks/package")); // distディレクトリに出力
});
