const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const path = require('path');

function styles(projectPath) {
  return gulp.src(`${projectPath}/src/styles/style.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(`${projectPath}/src/styles`));
}

function watch(projectPath) {
  gulp.watch(`${projectPath}/src/styles/style.scss`, () => styles(projectPath));
}

function stylesComponents(componentPath) {
  return gulp.src(`${componentPath}/**/*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(`${componentPath}`));
}

function watchComponents(componentPath) {
  gulp.watch(`${componentPath}/**/*.scss`, () => stylesComponents(componentPath));
}

gulp.task('styles-head-office', () => styles('apps/head-office'));
gulp.task('watch-head-office', () => watch('apps/head-office'));
gulp.task('styles-components', () => stylesComponents('apps/head-office/src/components'));
gulp.task('watch-components', () => watchComponents('apps/head-office/src/components'));

exports.styles = styles;
exports.watch = watch;

exports.default = gulp.parallel(
  'styles-head-office',
  'watch-head-office',
  'styles-components',
  'watch-components'
);
