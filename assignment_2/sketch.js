var ropes = [];
var mouseRepelStrength = 100;
var particlesPerRope = 40;
var springLength = 10;
var springStrength = .2;
var springFriction = .1;
var airFriction = 0.01;
var gravitation;

function setup() {
  gravitation = createVector(0, 0.05);
  createCanvas(displayWidth, displayHeight);
  for (var i = 0; i*10 < width; i++) {
    ropes.push(new Rope(particlesPerRope,
      createVector(i*10, 0),
      springLength,
      springStrength,
      springFriction,
      airFriction)
    );
  }
}

function draw() {
  background(0,0,0,100);
  ropes.forEach(function(rope) {
    rope.applyInternalForce();
    rope.applyForce(gravitation);
    rope.update();
    rope.display();
  })
}

function mouseClicked() {
  ropes.forEach(function(rope) {
    rope.repelFromMouse(mouseX, mouseY, 200);
  })
}
