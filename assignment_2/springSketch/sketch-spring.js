// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 2: Gravitational Attraction

// One particle, one attractor
var particles = [];
var numParticles = 200;
var spring;

function setup() {
  createCanvas(640, 360);

  // Create a circle of particles that will all be attached by a spring to the same point
  var angle = TWO_PI/numParticles
  var radius = 100
  for (var i = 0; i < numParticles; i++) {
    particles.push(new Particle((width/2)+(radius*sin(angle*i)), (height/2)+(radius*cos(angle*i))));
  }
  spring = new Spring(width/2, height/2, 0.4);
}

function draw() {
  background(128, 121, 108);

  // Attractor attracts particle
  particles.forEach(function (particle, index, array) {
    var force = spring.calculateForce(particle);
    particle.applyForce(force);
    particle.update();
    particle.display();
  })
}
