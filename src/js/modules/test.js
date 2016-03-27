import $ from 'jquery'

export default class Test {
  constructor (text) {
    this.text = text;
  }

  output() {
    console.log(this.text);
  }

  btnClick(target, $mediator) {
    console.log('ボタンクリック', $(target).data('name'));
    $mediator.trigger('hage');
  }
}

class Cat {
  constructor(n) {
    this.name = n;
  }
  set name(name) {
    this._name = name;
    console.log('set?');
  }
  get name() {
    console.log('get?');
    return this._name;
  }
  walk() {
    console.log(this._name + 'が歩いてます');
  }
}

class WildCat extends Cat {
  constructor(n) {
    super(n);
  }
  walk() {
    console.log(this._name + 'が走っています');
  }
}
