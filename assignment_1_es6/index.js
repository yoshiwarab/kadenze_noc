import P5 from 'p5'
import 'p5/lib/addons/p5.sound'
import 'p5/lib/addons/p5.dom'

const s = function (p) {
  let walkers = [];

  p.setup = function () {
    p.createCanvas(800, 640, p.WEBGL);
    var radius = 100;
    var numPoints = 20;
    var angle = p.TWO_PI/numPoints;
    for (var i = 0; i < numPoints; i++) {
      walkers.push(new Walker(p, radius*p.sin(angle*i), p.height/2, radius*p.cos(angle*i)));
    }
    p.perspective(60 / 180 * p.PI, p.width/p.height, 0.1, 100);
  }

  p.draw = function () {
    p.orbitControl();
    p.background(100);
    p.noStroke();
    // walker.walk();
    for (var walker of walkers) {
      walker.walk();
      walker.display();
    }
  }
}

class Walker {

  constructor(p, x=0, y=0, z=0) {
    this.position = p.createVector(x, y, z)
    this.noff = p.createVector(p.random(100),p.random(100), p.random(100));
    this.p = p;
    this.reachedTop = true;
    this.reachedBottom = false;
    this.history = [];
  }

  display() {
    let p = this.p;
    var dirX = (p.mouseX / p.width - 0.5) *2;
    var dirY = (p.mouseY / p.height - 0.5) *(-2);
    p.directionalLight(250, 250, 250, dirX, dirY, 0.25);
    p.ambientMaterial(250);


//     float radius=50;
// int numPoints=20;
// float angle=TWO_PI/(float)numPoints;
// for(int i=0;i<numPoints;i++)
// {
//   point(radius*sin(angle*i),radius*cos(angle*i));
// }

    // p.push();
    // p.translate(this.position.x, this.position.y, this.position.z);
    // p.rotateY(1.25);
    // p.rotateX(-0.9);
    // p.sphere(20);
    // p.pop();

    for (var i = 0; i < this.history.length; i++) {
      p.push();
      var pastPos = this.history[i];
      p.translate(pastPos[0], pastPos[1], pastPos[2]);
      p.sphere(1);
      p.pop();
    }
  }

  walk() {
    let p = this.p;
    this.history.push([this.position.x, this.position.y, this.position.z]);
    this.position.x = p.map(p.noise(this.noff.x),0,1,-p.width/2,p.width/2);
    this.position.y--;
    this.position.z = p.map(p.noise(this.noff.z),0,1,-100,100);
    this.noff.add(0.01,0.01,0.01);
  }
}

new P5(s)
