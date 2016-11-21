var walkers = [];

function setup() {
  console.log("hello");
  createCanvas(800, 640, WEBGL);
  noStroke();

  // Set the number of walkers to create
  var numWalkers = 30;
  for (var i = 0; i < numWalkers; i++) {
    walkers.push(new Walker(0, height/2, 0));
  }
}

function draw() {
  // Set background black
  background(0);
  // Allow camera movement with mouse
  orbitControl();
  // Directional light follows the mouse
  var dirX = (mouseX / width - 0.5) * 2;
  var dirY = (mouseY / height - 0.5) *(-2);
  directionalLight(250, 250, 250, dirX, dirY, 0.25);
  ambientMaterial(250);
  for (var i = 0; i < walkers.length; i++) {
    walker = walkers[i];
    walker.walk();
    walker.display();
  }
}
