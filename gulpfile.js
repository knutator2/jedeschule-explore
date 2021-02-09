var gulp = require("gulp");
var inline = require("gulp-file-inline");
var del = require("del");


gulp.task("es5es2015", function () {
  return gulp
    .src("./dist/jedeschule-explore/index.html")
    .pipe(
      inline({
        css: {
          minify: false, //@see https://www.npmjs.com/package/clean-css#constructor-options
        },
        js: {
          minify: false, //@see https://www.npmjs.com/package/uglify-js#minify-options
        },
      })
    )
    .pipe(gulp.dest("./dist/oneFileEs5Es2015"));
});

gulp.task("es5", function () {
  return gulp
    .src("./dist/jedeschule-explore/index.html")
    .pipe(
      inline({
        css: {
          minify: false, //@see https://www.npmjs.com/package/clean-css#constructor-options
        },
        js: {
          function(tag) {
            return tag.indexOf(" nomodule defer") > -1 || tag.indexOf(' src="scripts.') > -1 && tag.indexOf(' defer');
          },
          minify: false, //@see https://www.npmjs.com/package/uglify-js#minify-options
        },
      })
    )
    .pipe(gulp.dest("./dist/oneFileEs5"));
});


gulp.task("es2015", function () {
  return gulp
    .src("./dist/jedeschule-explore/index.html")
    .pipe(
      inline({
        css: {
          minify: false, //@see https://www.npmjs.com/package/clean-css#constructor-options
        },
        js: {
          filter: function (tag) {
            return tag.indexOf(' type="module"') > -1 || tag.indexOf(' src="scripts.') > -1 && tag.indexOf(' defer');
          },
          minify: false, //@see https://www.npmjs.com/package/uglify-js#minify-options
        },
      })
    )
    .pipe(gulp.dest("./dist/oneFileEs2015"));
});

gulp.task("default", gulp.parallel("es5es2015", "es5", "es2015"));

gulp.task("clean", function() {
  return del(["./dist/oneFileEs5", "./dist/oneFileEs2015", "./dist/oneFileEs5Es2015"]);
});
