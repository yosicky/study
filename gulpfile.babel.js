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
import PATHS from './config'

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

  // browserify対象のJSファイルの配列
  const FILES = glob.sync(`${PATHS.srcJS}*.js`);

  // ソースファイルの配列からからバンドル後のファイル名の配列を作成
  const buildFiles = FILES.map((file) => {
    return file.replace(PATHS.srcJS, '');
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
      .pipe(fs.createWriteStream(PATHS.buildJS + buildName));
  }

  // watchタスクの場合browserifyのプラグインにwatchfyを指定
  let plugin = (watch) ? [watchify] : [];

  // エントリーポイントとなる各JSファイルに対してバンドル
  FILES.forEach((srcFile, index) => {
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
    mkdirp(PATHS.buildJS, (err) => {
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
 * HTMLファイルをdistにコピーする
 */
const html = (file) => {

  // 指定のファイルがある場合はそのファイルを、無い場合はsrc/htmlの全htmlを対象にする
  const FILE = file ? file : `${PATHS.srcHtml}*.html`;

  // コピー
  gulp.src(FILE)
    .pipe(gulp.dest(PATHS.build))
    .pipe($.size({
      showFiles: true,
      title: 'copy'
    }));
}

/**
 * srcのHTMLファイルをdistにコピーし、ソースのhtmlに変更があったらそのファイルをコピーする
 */
const html_watch = () => {

  // 初めに全てのhtmlをdistにコピー
  html();

  // 変更のあったhtmlをdistにコピー
  gulp.watch(`${PATHS.srcHtml}*.html`, (e) => { return html(e.path); });
}

/**
 * sassコンパイル
 */
const sass = () => {

  // 指定のファイルがある場合はそのファイルを、無い場合はsrc/sassの全scssを対象にする
  const FILE = `${PATHS.srcSass}*.scss`;

  // Sassコンパイル
  gulp.src(FILE)
    .pipe($.plumber())
    .pipe($.sass())
    .on('error', $.notify.onError({
          title: 'Sass Error',
          message: '<%= error.message %>'
     }))
    .pipe($.cssnext({
      compress: true
    }))
    .pipe(gulp.dest(PATHS.buildCSS))
    .pipe($.size({
      showFiles: true,
      title: 'copy'
    }));
}

/**
 * sassの変更を監視しコンパイル
 */
const sass_watch = () => {

  // 初めに全てコンパイル
  sass();

  // 
  gulp.watch(`${PATHS.srcSass}**/*.scss`, (e) => { return sass(); });
}

/**
 * browser-sync　サーバー起動
 */
const serve = () => {

  const WATCH_DIR = PATHS.build.replace(/^\.\//, '');

  bs.init({
    server: {
      baseDir: PATHS.build,
      index: 'index.html'
    }
  });

  gulp.watch(`${WATCH_DIR}**/*`).on('change', reload);
}

// JS tasks
gulp.task('js_build', () => { return compile(); });
gulp.task('js_watch', () => { return jsWatch(); });

// HTML tasks
gulp.task('html_copy', () => { return html(); });
gulp.task('html_watch', () => { return html_watch(); });

// CSS tasks
gulp.task('css_build', () => { return sass(); });
gulp.task('css_watch', () => { return sass_watch(); });

gulp.task('watch', ['html_watch', 'js_watch', 'css_watch'], () => { return serve(); });
gulp.task('build', ['html_copy', 'js_build', 'css_build']);

gulp.task('default', ['watch']);
