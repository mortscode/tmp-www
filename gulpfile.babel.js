import gulp from 'gulp';
import browserify from 'gulp-browserify';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import uglify from 'gulp-uglify';
import livereload from 'gulp-livereload';
import browserSync from 'browser-sync';

// TASKS *************

// HTML
gulp.task('html', () => {
  return gulp.src('craft/templates/**/*.html')
    .pipe(browserSync.stream());
});

// SCRIPTS
gulp.task('scripts', () => {
  return gulp.src('_src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(browserify({
      transform: ['babelify'],
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/assets/js'))
    .pipe(browserSync.stream());
});

// SCRIPTS-MINIFIED
gulp.task('scripts-min', () => {
  return gulp.src('_src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(browserify({
      transform: ['babelify'],
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/assets/js'));
});

// STYLES
gulp.task('styles', () => {
  return gulp.src('_src/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/assets/styles'))
    .pipe(browserSync.stream());
});

// Watch Files For Changes & Reload
// Uncomment proxy and change to dev site local url
gulp.task('reload', ['html', 'scripts', 'styles'], () => {
  livereload.listen();
  gulp.watch(['craft/templates/**/*.html'], ['html']);
  gulp.watch(['_src/js/**/*.js'], ['scripts']);
  gulp.watch(['_src/styles/**/*.scss'], ['styles']);
});

gulp.task('default', ['scripts', 'styles'], () => {
  browserSync.init({
    proxy: 'http://tmp-www.craft.dev',
    port: 8080
  });
  gulp.watch(['craft/templates/**/*.html'], browserSync.reload);
  gulp.watch(['_src/js/**/*.js'], ['scripts'], browserSync.reload);
  gulp.watch(['_src/styles/**/*.scss'], ['styles'], browserSync.reload);
});

// Watch Files For Changes & Reload
// Uncomment proxy and change to dev site local url
gulp.task('build', ['html', 'scripts-min', 'styles'], () => {});
