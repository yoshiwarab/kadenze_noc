// These functions depend on p5.js

function layoutCircle(radius, numPoints) {
  var angle = TWO_PI/numPoints;
  for (var i = 0; i < numPoints; i++) {
    var position = createVector(radius*sin(angle*i), height/2, radius*cos(angle*i));
    return position;
  }
}
