var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs');


gulp.task('sass',function(){
    return gulp.src('app/sass/*.sass').pipe(sass()).pipe(gulp.dest("app/css/"));
});

gulp.task('brow-sync',function(){

    browserSync.init({
        server: {
            baseDir: "./"
        },
        notify: false
    })



});

gulp.task('fromLib',function(){

    gulp.src([

        'libs/jquery/dist/jquery.js','libs/bootstrap/dist/js/bootstrap.js'

    ]).pipe(gulp.dest('js'));


    gulp.src([

        'libs/bootstrap/dist/css/bootstrap.css',''

    ]).pipe(gulp.dest('css'));

});

gulp.task('watch',['brow-sync','sass'],function(){

   // gulp.watch('*.html').on('change',browserSync.reload);
   // gulp.watch('js/common.js').on('change',browserSync.reload);
    gulp.watch('*.html',browserSync.reload);
    gulp.watch('common.js',browserSync.reload);
    gulp.watch('app/sass/*.sass',['sass']);
    gulp.watch('app/css/style.css',browserSync.reload);

});