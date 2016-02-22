import gulp from 'gulp'

import fs from 'fs'
import browserify from 'browserify'
import watchify from 'watchify'
import babelify from 'babelify'
import gutil from 'gulp-util'
import notify from 'gulp-notify'
import glob from 'glob'
//import {glob} from 'multi-glob'

const PATHS = {
  srcFiles: glob.sync('./src/js/*.js'),
//  srcFiles: glob(['./src/js/*.js', './src/js/modules/*.js'], ),
  build: './src/html/dist/', 
  buildFile: 'bundle.js'
}

function compile(watch) {
//let f = glob(['./src/js/*.js', './src/js/modules/*.js'], {sync: true}, (err, files) => {console.log(files);return;});
//console.log(f);

  let b = browserify({
//    entries: ['./src/js/index.js'],
    entries: PATHS.srcFiles,
    cache: {},
    packageCache: {},
    plugin: [watchify]
  });

  function bundle() {
    b
      .transform('babelify')
      .bundle()
      .pipe(fs.createWriteStream(PATHS.build + PATHS.buildFile));

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
