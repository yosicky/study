/**
 * study
 */

import forEach from 'lodash/forEach' 
import test from './modules/test'

var t = new test('index');

var myArray = [1, 2, 3, 4, 5];
var myObj = {
  a: 100,
  b: 200,
  c: 300
};

forEach(myObj, (val, key) => {
  console.log(val, key);
});
