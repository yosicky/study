(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _test = require('./modules/test');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) {
                               return obj && obj.__esModule ? obj : { default: obj };
}

console.log('studyaaaaaabc'); /**
                               * study
                               */

var t = new _test2.default('ddddd');

},{"./modules/test":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Test = function Test(text) {
  _classCallCheck(this, Test);

  console.log(text);
};

exports.default = Test;

},{}]},{},[1]);