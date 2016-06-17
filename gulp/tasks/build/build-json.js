'use strict';

module.exports = function(gulp, config, plugins) {

  return function() {
    return gulp.src(config.jsonHome)
      .pipe(gulp.dest(config.jsonBase));
  };
};
