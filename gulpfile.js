const gulp = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify-es').default;
const browserSync = require("browser-sync").create();
const del = require('del');
const rollup = require('gulp-rollup');

const watchTasks = [
    {
        name: 'html-watch',
        taskWillExecuteBefore: 'html'
    },
    {
        name: 'styles-watch',
        taskWillExecuteBefore: 'styles'
    },
    {
        name: 'scripts-watch',
        taskWillExecuteBefore: 'scripts'
    }
];

watchTasks.forEach((task) => {
    gulp.task(task.name, [task.taskWillExecuteBefore], (done) => {
        browserSync.reload();
        done();
    });
});

gulp.task('html', () => {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./prod'));
});

gulp.task('styles', () => {
    return gulp.src('./src/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(rename('bundle.min.css'))
        .pipe(gulp.dest('./prod/css'));
});

gulp.task('scripts', () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(rollup({
            input: './src/js/index.js',
            format: 'es'
        }))
        .pipe(uglify())
        .pipe(rename('bundle.min.js'))
        .pipe(gulp.dest('./prod/js'));
});

gulp.task('images', () => {
    gulp.src('./src/img/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./prod/img'));
});

gulp.task('serve', () => {
    browserSync.init({
        server: './prod'
    });

    gulp.watch('./src/*.html', ['html-watch']);
    gulp.watch('./src/scss/**/*.scss', ['styles-watch']);
    gulp.watch('./src/js/**/*.js', ['scripts-watch']);
});

gulp.task('server-prod', () => {
    browserSync.init({
        server: {
            baseDir: "./prod"
        }
    });
});

gulp.task('clean', () => {
    del('./prod/*');
});
