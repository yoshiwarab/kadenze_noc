var Spring = function(springConstant, springLength, frictionConstant) {

	this.springConstant = springConstant; // Stiffness of the spring (float)
	this.springLength = springLength; // The length that the spring does not exert any force (float)
	this.frictionConstant = frictionConstant; // Used for inner friction of the spring (float)

	this.calculateForce = function(p1, p2) {
		var springVector = p5.Vector.sub(p1.pos, p2.pos); // Vector between the two particles
		var distance = springVector.mag();
		var force = createVector(0,0);
		// Normalize the springVector for direction.
		// Multiply by -1 to pull not push.
		// The force of the spring is greater the further away the particles
		// are from each other (springLength * springConstant).
		// The spring should apply no force however when the particles attached are
		// have a separation distance equal to the springLength (distance - springLength)
		if (distance != 0)
			 force.add(springVector.normalize().mult(-1).mult((distance - this.springLength) * this.springConstant));
		// Apply spring inner friction
		force.add(p5.Vector.sub(p1.vel, p2.vel).mult(-1).mult(this.frictionConstant));
		return force;
	}
}
