var gulp = require('gulp');
var browserSync = require('browser-sync');
var $    = require('gulp-load-plugins')();

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];
gulp.task('serve', function() {
    browserSync.init({
      server:"./public/",
      browser:"Google Chrome Canary"
    });
    gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch("public/*.html").on('change', browserSync.reload); 
});

gulp.task('sass', function() {
  return gulp.src('scss/*.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
