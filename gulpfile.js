var gulp = require('gulp'),

// Include Our Plugins
    // debug = require('gulp-debug'),  // uncomment plugin when debugging
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    urlAdjuster = require('gulp-css-url-adjuster'),
    concat = require('gulp-concat'),
    handlebars = require('gulp-compile-handlebars'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    streamQueue = require('streamqueue'),
    autoprefixer = require('autoprefixer'),
    mqpacker = require('css-mqpacker'),
    stylelint = require('stylelint'),
    syntax_scss = require('postcss-scss'),
    reporter = require('postcss-reporter'),
    postcss = require('gulp-postcss'),
    flatten = require('gulp-flatten'),
    watch = require('gulp-watch'),
    imagemin = require('gulp-imagemin');

    browserSync = require('browser-sync').create();

// Sass, HTML, Js Files - the folder, files to look for, and destination
var paths = {
  styles: {
    src: './scss',
    files: './assets/scss/*.scss',
    minify: './assets/css/styles.css',
    // BrowserSync
    syncFiles: '.',  
    // directories to exclude (from compiling, etc.)
    exclude: ['!./Content/global/scss_converted/**/*', '!./Components/**/*'],
    dest: './assets/css'
  },

  html: {
    files: ['*.html', '*/*.html', '*/**/*.html']
  },

  js: {
    files: ['./assets/js/*.js']
  },

  img: {
    files: ['./assets/img/*/**']
  },

  hbcpages: {
    files: ['./pages/*.hbs', './pages/**/*.hbs']
  }  
};

// BrowserSync: automatically refresh browser(s) & watch for changes to files
// Static Server + watching scss/html files
gulp.task('browsersync', ['minify', 'html', 'scripts'], function() {
  browserSync.init({
      server: "./dist/"
  });
  gulp.watch([paths.html.files, paths.js.files ]).on('change', browserSync.reload);
});

// Handlebars Templating Task
gulp.task('html', () => {
  gulp.watch(paths.hbcpages.files)
  .on('change', function () {
    return gulp.src(paths.hbcpages.files)
      .pipe(handlebars({}, {
        ignorePartials: true,
        batch: ['./partials']
      }))
      .pipe(rename({
        extname: '.html'
      }))
      .pipe(gulp.dest('./dist'));
    });
});

// Image Compression 
gulp.task('img-compress', () =>
    gulp.src(paths.img.files)
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/assets/img'))
);

// Watch for changes to Sass files on all Pages and produce Sourcemap
gulp.task('scss', function () {
  gulp.watch(paths.styles.files)
  .on('change', function () {
    return gulp.src(paths.styles.files) // Gets all files ending with .scss in content/global
      .pipe(sourcemaps.init())
        // Keep the outputStyle as 'nested' otherwise line #'s get thrown off in sourcemaps debugging
        .pipe(sass({ outputStyle: 'nested', precision: 6 }).on('error', sass.logError))  // add '.' for ext
        .pipe(sourcemaps.write())  
        .pipe(gulp.dest('./assets/css/'))
    // Output to same destination as src
    /* .pipe(gulp.dest(function (file) {
      return file.base;
    })) */
    .pipe(browserSync.stream());
  });
});

// Run PostCSS, strip out the sourcemap, then minify 
gulp.task('minify', function () {
  gulp.watch(paths.styles.minify)
  .on('change', function (file) {
    var destPath = file.path.replace('styles.css', '.'),
        // PostCSS Plugins for Production CSS (PostCSS tasks must be AFTER the Sass task)
        processorsProd = [
          autoprefixer({ browsers: ['last 2 versions', 'not ie < 11'] }),
          //mqpacker(),
        ];

    gulp.src(file.path)
      .pipe(postcss(processorsProd))
      .pipe(rename({ suffix: '.min' }))
      .pipe(cleanCSS({ debug: true, rebase: false }, function (details) {
        console.log('---- Minify CSS for Prod ----');
        console.log(file.path + ': ');
        console.log(details.stats.originalSize + ' original size' + ' --- '
        + details.stats.minifiedSize + ' minified size.');  //details.name + ': ' +
      }))
    .pipe(gulp.dest(destPath));
  });
});

// Main Task for compiling, minifying - simply run 'gulp' OR 'yarn start' via CLI
gulp.task('default', ['scss', 'scripts', 'html', 'copy-files', 'browsersync' ]);  // 'img-compress'

// Concantenate JavaScript 
// In production, the file is minified
gulp.task('scripts', function() {
    return gulp.src([
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/what-input/dist/what-input.min.js',
      './node_modules/foundation-sites/dist/js/foundation.min.js',
      './assets/js/fontawesome.js',
      './assets/js/font-qts.js',
      './assets/js/custom.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./assets/js/'))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify()) 
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./assets/js/'))
});

// Copy All Assets (if file changed) to the Dist folder
var source = './assets',  
    destination = './dist/assets';

gulp.task('copy-files', function() {  
  gulp.src(source + '/**/*', {base: source})
    .pipe(watch(source, {base: source}))
    .pipe(gulp.dest(destination));
});
  
// Copy Component/Content Fonts to public folder relative to compiled CSS file
gulp.task('fonts-copy', function () {
  return gulp.src(['./Components/*/fonts/*', './Content/*/fonts/*',])
  .pipe(flatten())
  .pipe(gulp.dest('./Content/fonts'));
});

// Stylelint Task for analyzing Sass files by running through Stylelint & produces report
gulp.task('analyze-scss', function () {
  return gulp.src(paths.styles.files)
    .pipe(postcss([
      stylelint(),
      reporter()],
      {syntax: syntax_scss}
    ));
});


// SAVE the Commented Out Task Directly Below!!!! Autoprefixer Check -
// Uncomment & run gulp via CLI to see the browser list, rules, selectors, & properties covered
// var info = autoprefixer({ browsers: ['last 3 versions', 'not ie < 11'] }).info();
// console.log(info);


// ---------------------------------------------------------------------------
// Compile and Minify a One-off Sass file (i.e.- Font-Icons-Fallback, etc.) - Run task seperately/independently!!!
gulp.task('compile-file', function (file) {
  var fileWatch = './Content/Css/font-icons-fallback.scss';  // change file name here
  gulp.watch(fileWatch);
    return gulp.src(fileWatch) // Gets all files ending with .scss in app/scss
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(rename({ suffix: '.min' }))
      .pipe(cleanCSS({ debug: true, rebase: false }, function (details) {
        console.log('---- Compile & Minify CSS for Prod ----');
        console.log(file.path + ': ');
        console.log(details.stats.originalSize + ' original size' + ' --- '
        + details.stats.minifiedSize + ' minified size.');
      }))
    .pipe(gulp.dest('./Content/Css/'));
});