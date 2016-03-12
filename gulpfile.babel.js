import gulp from 'gulp'

import fs from 'fs'
import path from 'path'
import browserify from 'browserify'
import watchify from 'watchify'
import babelify from 'babelify'
import notifier from 'node-notifier'
import glob from 'glob'
import mkdirp from 'mkdirp'
import gulpLoadPlugins from 'gulp-load-plugins'
import browserSync from 'browser-sync'

const $ = gulpLoadPlugins();
const bs = browserSync.create();
const reload = bs.reload;
const getDirName = path.dirname;

/**
 * ファイルを書き込むとき指定のディレクトリがなければ作成してファイルを書き込む
 * @param  {string}            path     書き込むファイルパス
 * @param  {string | buffer}   contents 書き込むコンテンツ
 * @param  {Function}          cb       コールバック
 * @return {}
 */
//function writeFile (path, contents, cb) {
//  mkdirp(getDirName(path), function (err) {
//    if (err) return cb(err)
//    fs.writeFile(path, contents, cb)
//  })
//}

/**
 * JavaScript browserify
 * @param {boolean} watch JSファイル監視モードか
 */
const compile = (watch) => {

  // ファイル情報
  const PATHS = {
    srcFolder: './src/js/',
    srcFiles: glob.sync('./src/js/*.js'),
    buildFolder: './dist/js/',
  };

  // ソースファイルの配列からからバンドル後のファイル名の配列を作成
  const buildFiles = PATHS.srcFiles.map((file) => {
    return file.replace(PATHS.srcFolder, '');
  });

  // browserifyでJSをバンドル
  const bundle = (b, buildName) => {
    b
      .transform('babelify')
      .transform({global: true}, 'uglifyify')
      .bundle(() => {
        notifier.notify(
          {
            title: 'Gulp',
            message: buildName + 'bundle',
            icon: path.join(__dirname, 'gulp-2x.png')
          }
        );
        $.util.log(buildName + ' bundle');
      })
      .on('error', $.notify.onError({
            title: 'Compile Error',
            message: '<%= error.message %>'
       }))
      .pipe(fs.createWriteStream(PATHS.buildFolder + buildName));
  }

  // watchタスクの場合browserifyのプラグインにwatchfyを指定
  let plugin = (watch) ? [watchify] : [];

  // エントリーポイントとなる各JSファイルに対してバンドル
  PATHS.srcFiles.forEach((srcFile, index) => {
    let b = browserify({
      entries: srcFile,
      cache: {},
      packageCache: {},
      plugin: plugin
    });

    // JSファイル監視モードの場合ファイルアップデート時にバンドル
    if (watch) {
      b.on('update', () => {
        bundle(b, buildFiles[index]);
        $.util.log(srcFile + ' bundling...');
      });
    }

    // バンドル実行
    // 書き出し先ディレクトリが無い場合作成する
    mkdirp(PATHS.buildFolder, (err) => {
        if (err) console.error(err)
        else bundle(b, buildFiles[index])
    });
  });
}

/**
 * JavaScript browserify をウォッチモードで実行
 * @return {}
 */
const jsWatch = () => {
  return compile(true);
};

/**
 * srcのHTMLファイルをdistにコピーする
 */
const html = () => {

  // ファイル情報
  const PATHS = {
    srcFolder: './src/html/',
    buildFolder: './dist',
  };

  gulp.src(PATHS.srcFolder + '*.html')
    .pipe(gulp.dest(PATHS.buildFolder))
    .pipe($.size({
      showFiles: true,
      title: 'copy'
    }));
}

/**
 * srcのHTMLファイルをdistにコピーし、ソースのhtmlに変更があったらそのファイルをコピーする
 */
const html_watch = () => {
  html();
  gulp.watch('./src/html/*.html', () => { return html(); });
}

/**
 * browser-sync　サーバー起動
 */
const serve = () => {

  bs.init({
    server: {
      baseDir: './dist/',
      index: 'index.html'
    }
  });

  gulp.watch('dist/**/*').on('change', reload);
}

// JS tasks
gulp.task('js_build', () => { return compile(); });
gulp.task('js_watch', () => { return jsWatch(); });

// HTML tasks
gulp.task('html_copy', () => { return html(); });
gulp.task('html_watch', () => { return html_watch(); });


gulp.task('watch', ['html_watch', 'js_watch'], () => { return serve(); });
gulp.task('build', ['html_copy', 'js_build']);

gulp.task('default', ['watch']);
