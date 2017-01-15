/**
 * study
 */

import forEach from 'lodash/forEach' 
//import test from './modules/test'
//import Entry from './modules/base'
//import $ from 'jquery'
import $ from './modules/jquery-2.2.2.min'
import modernizr from './modules/modernizr/modernizr-custom'

var STUDY = STUDY || {};

STUDY.t = new test('index');

STUDY.myArray = [1, 2, 3, 4, 5];
STUDY.myObj = {
  a: 100,
  b: 200,
  c: 300,
  d: 600
};
// STUDY.elements = {
//   dog: $('#dog'),
//   cat: $('#cat'),
//   fish: $('#fish'),
//   tiger: $('#tiger')
// };
STUDY.config = {
  url: '/js/data/test.json'
};


forEach(STUDY.myObj, (val, key) => {
  console.log(val, key);
});

class EntryDefault extends Entry {

}

$(function () {
  const $modal = $('#fn-modal');
  let elements = {
    dog: $('#dog'),
    cat: $('#cat'),
    fish: $('#fish'),
    tiger: $('#tiger'),
    prices: $('.price')
  };
//  alert($().jquery);
  let $mediator = $('<mediator/>');
  $('#fn-btn').on('click', (e) => { 
    STUDY.t.btnClick(e.target, $mediator);
    $modal.addClass('is-active');
    $modal.on('click', (e) => {
      console.log(e.target, e.currentTarget);
      if (e.target === e.currentTarget) {
        $(e.target).removeClass('is-active');
      }
    });
    $modal.css({height: $(window).height() + 'px'});
//    let scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
//    $('body').on(scroll_event, function (e) {
//      e.preventDefault();
//    });
//    $('body').on('touchmove.noScroll', function (e) {
//      e.preventDefault();
//    });
  });
  $mediator.on('hagee', () => { console.log('hage'); });

  let e = new EntryDefault(elements, STUDY.config, $mediator);

});




//* ajax処理中はボタンクリックを無効にする
//
//- 郵便番号入力=>住所検索ボタンクリック
//- 入力値をサーバーへリクエスト
//- 返却値を調べる
//-- 成功：(data.count <= 0) ? エラーダイアログ
//-- 成功：(data.count > 1) ? 住所選択ダイアログ
//--- 決定ボタンクリック=>フォームに住所を入力
//-- 成功：(data.count === 1) ? フォームに住所を入力
//-- 失敗：エラーダイアログ
//
//- 住所から郵便番号検索クリック
//- 住所入力ダイアログ表示
//- 検索ボタンクリック
//- 入力値をサーバーへリクエスト
//- 返却値を調べる
//-- 成功：(data.count <= 0) ? エラーメッセージ表示
//-- 成功：(data.count >= 1) ? 住所選択セレクトボックス表示
//-- 決定ボタンクリック=>フォームに住所を入力
//-- 失敗：エラーダイアログ

//クラスプロパティはnewするとき引数で渡す
//configを別ファイルで管理する

//表示中な最後の行にクラスを付与する




