function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }

  // Set up the black canvas background
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw an initial vector for demonstration
  var v1 = new Vector3([0, 0, 0]);
  drawVector(v1, "red");
}

function drawVector(v, color) {
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d');

  // Scale the vector for better visualization
  var scale = 20;
  var scaledX = v.elements[0] * scale;
  var scaledY = v.elements[1] * scale;

  // Center of the canvas
  var originX = canvas.width / 2;
  var originY = canvas.height / 2;

  // Draw the vector
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(originX, originY); // Start from the canvas center
  ctx.lineTo(originX + scaledX, originY - scaledY); // End at the vector's coordinates
  ctx.stroke();
}

function handleDrawOperationEvent() {
  const canvas = document.getElementById("example");
  const ctx = canvas.getContext("2d");

  // Clear the canvas and reset the background
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Get user input for v1
  const v1x = parseFloat(document.getElementById("v1-x").value) || 0;
  const v1y = parseFloat(document.getElementById("v1-y").value) || 0;

  // Get user input for v2
  const v2x = parseFloat(document.getElementById("v2-x").value) || 0;
  const v2y = parseFloat(document.getElementById("v2-y").value) || 0;

  // Get operation
  const operation = document.getElementById("operation-select").value;

  // Create vectors
  const v1 = new Vector3([v1x, v1y, 0]);
  const v2 = new Vector3([v2x, v2y, 0]);

  // Always draw v1 and v2 in their respective colors
  drawVector(v1, "red");
  if (v2x !== 0 || v2y !== 0) {
    drawVector(v2, "blue");
  }

  // Perform the selected operation and draw the result
  if (operation === "add") {
    const v3 = v1.add(v2);
    if (v3) drawVector(v3, "green");
  } else if (operation === "sub") {
    const v3 = v1.sub(v2);
    if (v3) drawVector(v3, "green");
  } else if (operation === "mul") {
    const scalar = parseFloat(document.getElementById("scalar-input").value) || 1;
    if (scalar !== 1) {
      const v3 = v1.mul(scalar);
      drawVector(v3, "green");
    }
  } else if (operation === "div") {
    const scalar = parseFloat(document.getElementById("scalar-input").value) || 1;
    if (scalar !== 1 && scalar !== 0) {
      const v3 = v1.div(scalar);
      drawVector(v3, "green");
    }
  } else if (operation === "magnitude") {
    console.log(`Magnitude of v1: ${v1.magnitude().toFixed(2)}`);
    console.log(`Magnitude of v2: ${v2.magnitude().toFixed(2)}`);
  } else if (operation === "normalize") {
    try {
      const norm1 = v1.normalize();
      const norm2 = v2.normalize();
      drawVector(norm1, "green");
      drawVector(norm2, "green");
    } catch (error) {
      console.log(error.message);
    }
  } else if (operation === "area") {
    const area = areaTriangle(v1, v2);
    console.log(`Area of the triangle formed by v1 and v2: ${area.toFixed(2)}`);
  } else if (operation === "angle") {
    try {
      const angle = angleBetween(v1, v2);
      console.log(`Angle between v1 and v2: ${angle.toFixed(2)} degrees`);
    } catch (error) {
      console.log(error.message);
    }
  }
}
