var Particle = function(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.mass = 1;

  this.applyForce = function(force) {
    var f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  };

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  this.display = function() {
    strokeWeight(0);
    var magMap = map(this.vel.mag(), 0, 15, 1, 10);
    ellipse(this.pos.x, this.pos.y, this.mass*magMap, this.mass*magMap);
  };
}
