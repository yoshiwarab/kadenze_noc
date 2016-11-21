/**
 * A class to represent a rope.  A rope is made up of a number of particles
 * strung together by springs. Each spring has a specific length at which it
 * exerts no force.  This is represented by the springLength variable.
 * Based on http://nehe.gamedev.net/tutorial/rope_physics/17006/
 * @param {Number} numParticles
 * @return {Vector} connectionPoint
 * @param {Number} springLength
 * @param {Number} springStrength
 * @param {Number} springFriction
 * @param {Number} airFriction
 */

var Rope = function(numParticles, connectionPoint, springLength, springStrength, springFriction, airFriction) {

  this.numParticles = numParticles;
  this.connectionPoint = connectionPoint;
  this.spring = new Spring(springStrength, springLength, springFriction)
  this.airFriction = airFriction;
  this.particles = [];

  for (var i = 0; i < this.numParticles; i++) {
    var particle = new Particle(this.connectionPoint.x, connectionPoint.y+(i*springLength));
    this.particles.push(particle);
  }

  // This function applies the force of the springs that connect each pair
  // of adjacent particles.
  this.applyInternalForce = function() {
    var particles = this.particles;
    for (var i = 0; i < this.numParticles-1; i++) {
      var force = this.spring.calculateForce(particles[i], particles[i+1]);
      particles[i].applyForce(force);
      particles[i+1].applyForce(force.mult(-1));
    }
  }

  // If force is null this function applies air friction to the rope. Otherwise
  // it applies the forces provided in addition to air friction.
  // I chose to apply multiple forces in this function instead of having a
  // separate function to apply airFriction to reduce the number of times we need
  // to loop through all of the particles.
  // Question for grader: Is the efficiency gained by doing this trivial or
  // worthwhile? How should I move airFriction calculation outside of the rope
  // class?
  this.applyForce = function(force) {
    var particles = this.particles;
    for (var i = 0; i < this.numParticles; i++) {
      particles[i].applyForce(gravitation);
      if (force != null) {
        particles[i].applyForce(force)
      }
      particles[i].applyForce(p5.Vector.mult(particles[i].vel, -1).mult(this.airFriction));
    }
    particles[0].pos = connectionPoint;
    particles[0].vel.mult(0);
    particles[0].acc.mult(0);
  }

  this.repelFromMouse = function(mouseX, mouseY, repelForce) {
    var particles = this.particles;
    var mouseVec = createVector(mouseX, mouseY);
    for (var i = 0; i < this.numParticles; i++) {
      var repelVec = p5.Vector.sub(particles[i].pos, mouseVec);
      var distance = repelVec.mag();
      var force = createVector(0,0);
      if (distance != 0)
        force.add(repelVec.normalize().mult(repelForce/(distance/2)));
      particles[i].applyForce(force);
    }
  }

  this.update = function() {
    var particles = this.particles;
    particles.forEach(function (particle) {
      particle.update();
    })
  }

  this.display = function() {
    var particles = this.particles;
    particles.forEach(function (particle) {
      particle.display();
    })
  }
}
