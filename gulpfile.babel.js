import gulp from 'gulp'

import fs from 'fs'
import browserify from 'browserify'
import watchify from 'watchify'
import babelify from 'babelify'

function compile(watch) {
  let b = browserify({
    entries: ['./src/js/index.js'],
    cache: {},
    packageCache: {},
    plugin: [watchify]
  });

  function bundle() {
    b
      .transform('babelify')
      .bundle()
      .pipe(fs.createWriteStream('build.js'));

  }

  if (watch) {
    b.on('update', () => {
      console.log('-> bundling...');
      bundle();
    });
  }

  bundle();

}

function watch() {
  return compile(true);
};

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch']);
