/**
 * study
 */

import forEach from 'lodash/forEach' 
import test from './modules/test'
import Entry from './modules/base'
import $ from 'jquery'

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


$(function () {
  let elements = {
    dog: $('#dog'),
    cat: $('#cat'),
    fish: $('#fish'),
    tiger: $('#tiger')
  };
  alert($().jquery);
  let $mediator = $('<mediator/>');
  $('#fn-btn').on('click', (e) => { STUDY.t.btnClick(e.target, $mediator); });
  $mediator.on('hage', () => { console.log('hage'); });

  let e = new Entry(elements, STUDY.config, $mediator);

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




