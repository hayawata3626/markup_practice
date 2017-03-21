var gulp = require("gulp"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    browser = require("browser-sync"),
    slim = require("gulp-slim"),
    plumber = require("gulp-plumber");

gulp.task("server", function() {
  browser({
    server: {
        baseDir: "./"
    }
  });
});

gulp.task("slim", function(){
  gulp.src('slim/*.slim')
    .pipe(slim({
      pretty: true,
      require: 'slim/include',
      options: 'include_dirs=[""]'
    }))
    .pipe(gulp.dest("."))
    .pipe(browser.reload({stream:true}));
});

gulp.task("sass", function() {
  gulp.src("sass/*scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest("./css"))
    .pipe(browser.reload({stream:true}));
});

gulp.task("default",['server'], function() {
    gulp.watch("sass/*.scss",["sass"]);
    gulp.watch("slim/*.slim",["slim"]);
});
