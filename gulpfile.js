const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function styles(projectPath) {
  return gulp.src(`${projectPath}/src/styles/style.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(`${projectPath}/src/styles`));
}

function watch(projectPath) {
  gulp.watch(`${projectPath}/src/styles/style.scss`, () => styles(projectPath));
}

gulp.task('styles-head-office', () => styles('apps/head-office'));
gulp.task('watch-head-office', () => watch('apps/head-office'));

exports.styles = styles;
exports.watch = watch;

exports.default = gulp.parallel(
  'styles-head-office',
  'watch-head-office'
);
