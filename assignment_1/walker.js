function Walker(x=0, y=0, z=0) {
  this.position = createVector(x, y, z);
  this.noff = createVector(random(100),random(100), random(100));
  this.history = [];

  this.reachedTop = false;
  this.reachedBottom = true;

  this.display = function() {
    // Draw all spheres in history
    for (var i = 0; i < this.history.length; i++) {
      var pastPos = this.history[i];
      push();
      translate(pastPos[0], pastPos[1], pastPos[2]);
      sphere(1)
      pop();
    }
  };

  this.walk = function() {
    // Keep history to only 300 spheres
    if (this.history.length > 300) this.history.shift();
    this.history.push([this.position.x, this.position.y, this.position.z]);

    // Set x and z of position to noise values
    this.position.x = map(noise(this.noff.x),0,1,-width/2,width/2);
    this.position.z = map(noise(this.noff.z),0,1,-200,200);

    if (this.position.y == height/2) {
      this.reachedBottom = true;
      this.reachedTop = false;
    }
    if (this.position.y == -height/2) {
      this.reachedTop = true;
      this.reachedBottom = false;
    }
    // Increment y to move down when we reach the top
    if (this.reachedTop) {
      this.position.y++;
    }
    // Decrement y to move up when we reacht the bottom
    if (this.reachedBottom) {
      this.position.y--;
    }
    this.noff.add(0.01,0.01,0.01);
  };
}
