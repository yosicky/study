import $ from 'jquery'

export default class Entry {
  constructor (obj, config, mediator) {
    this.$dog = obj.dog;
    this.$cat = obj.cat;
    this.$fish = obj.fish;
    this.$tiger = obj.tiger;
    this.$prices = obj.prices;
    this.config = config;
    this.prices = null;
    this.$mediator = mediator;

    this.$mediator.on('entry:request', this._setPrice.bind(this));
    this.$mediator.on('entry:setprice', this._dispTable.bind(this));

    this._init();
  }

  _init() {
    let request = () => {
      $.ajax({
        type: 'GET',
        dataType: 'json',
        url: this.config.url,
        success: (data) => {
          this.prices = data;
          this.$mediator.trigger('entry:request');
        }
        //error: obj.error
      });
    };
    request();
  }

  _setPrice() {
    let disp = (price, $element) => {
      if (price < 100) {
        $element.removeClass('is-display');
      } else {
        $element.addClass('is-display');
      }
    };
    for (let key in this.prices) {
      console.log(this.prices);
      switch (key) {
        case 'dog':
          console.log(this.$dog);
          disp(this.prices.dog, this.$dog);
          this.$dog.find('.price').html(this.prices.dog);
          break;
        case 'cat':
          disp(this.prices.cat, this.$cat);
          this.$cat.find('.price').html(this.prices.cat);
          break;
        case 'fish':
          disp(this.prices.fish, this.$fish);
          this.$fish.find('.price').html(this.prices.fish);
          break;
        case 'tiger':
          disp(this.prices.tiger, this.$tiger);
          this.$tiger.find('.price').html(this.prices.tiger);
          break;
      }
    }
    this.$mediator.trigger('entry:setprice');
  }

  _dispTable() {
    let len = $('.is-display').length;
    $('.is-display:last').find('.price').addClass('is-last');
  }
}
