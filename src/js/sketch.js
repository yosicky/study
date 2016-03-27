/**
 * p5.js sketch
 */

import p5 from 'p5'

console.log('hello!');

const S = (p) => {

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(230, 230, 230);
  }

  p.draw = function () {
//    p.ellipse(50, 50, 80, 80);

    if (p.mouseIsPressed) {
      p.fill(0);
    } else {
      p.fill(255);
    }
    p.ellipse(p.mouseX, p.mouseY, 80, 80);

// 2本の交差した直線を描く
p.stroke(130, 0, 0);
p.strokeWeight(4);
p.line(p.width/2 - 70, p.height/2 - 70, p.width/2 + 70, p.height/2 + 70);
p.line(p.width/2 + 70, p.height/2 - 70, p.width/2 - 70, p.height/2 + 70);
// 円を描く
p.fill(255, 150);
p.ellipse(p.width/2, p.height/2, 50, 50);
  }

}

new p5(S);
