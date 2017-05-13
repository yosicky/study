/**
 * nameTester
 */

import $ from './modules/jquery-2.2.2.min'

$(() => {
  console.log('nameTester');
  const KANA = [
    'あ', 'い', 'う', 'え', 'お',
    'か', 'き', 'く', 'け', 'こ',
    'さ', 'し', 'す', 'せ', 'そ',
    'た', 'ち', 'つ', 'て', 'と',
    'な', 'に', 'ぬ', 'ね', 'の',
    'は', 'ひ', 'ふ', 'へ', 'ほ',
    'ま', 'み', 'む', 'め', 'も',
    'や', 'ゆ', 'よ',
    'ら', 'り', 'る', 'れ', 'ろ',
    'わ', 'を', 'ん'
  ];
  let startCharacter = '',
      endCharacter = '',
      $createBtn = $('#createBtn'),
      $createBtnAfter = $('#createBtnAfter'),
      $output = $('#outputList');

  $createBtn.on('click', () => {
    // 結果を消す
    $output.empty();

    // スタート文字列を設定
    startCharacter = $('#baseCharacter').val();

    //　結果を作成
    $.each(KANA, (index, element) => {
      let result1 = startCharacter + element,
          listItem1 = '<li class="nameTester__outputListItem--first">' + result1 + '　　　' + '</li>';

      $output.append(listItem1);

      $.each(KANA, (index, element) => {
        let result2 = result1 + element,
            listItem2 = '<li class="nameTester__outputListItem">' + result2 + '　　　' + '</li>';

        $output.append(listItem2);
      });
    });
  });

    $createBtnAfter.on('click', () => {
    // 結果を消す
    $output.empty();

    // おしり文字列を設定
    endCharacter = $('#baseCharacter').val();

    //　結果を作成
    $.each(KANA, (index, element) => {
      let result = element + endCharacter,
          listItem = '<li class="nameTester__outputListItem">' + result + '　　　' + '</li>';

      $output.append(listItem);
    });
  });

});
