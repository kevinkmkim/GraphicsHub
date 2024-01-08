const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

if (!gl) {
  alert("WebGL is not supported in your browser.");
}

// Vertex shader program
const vsSource = `
  attribute vec2 a_position;
  uniform mat4 u_matrix;
  void main() {
      gl_Position = u_matrix * vec4(a_position, 0.0, 1.0);
  }
`;

const fsSource = `
  precision mediump float;
  void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Red color
  }
`;

// Create shader programs
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vsSource);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fsSource);
gl.compileShader(fragmentShader);

const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

// Define the triangle's vertices
const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);

// Create a buffer and bind the vertices to it
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// Get the attribute and uniform locations
const positionAttributeLocation = gl.getAttribLocation(
  shaderProgram,
  "a_position"
);
const matrixUniformLocation = gl.getUniformLocation(shaderProgram, "u_matrix");

// Enable the attribute
gl.enableVertexAttribArray(positionAttributeLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

// Initialize rotation angle
let angle = 0;

// Define the rendering loop
function render() {
  gl.clearColor(0.8, 0.8, 0.8, 1.0);
  // Clear the canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Calculate the transformation matrix for rotation
  const rotationMatrix = new Float32Array([
    Math.cos(angle),
    -Math.sin(angle),
    0.0,
    0.0,
    Math.sin(angle),
    Math.cos(angle),
    0.0,
    0.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    0.0,
    0.0,
    1.0,
  ]);

  // Set the transformation matrix in the shader
  gl.uniformMatrix4fv(matrixUniformLocation, false, rotationMatrix);

  // Draw the triangle
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  // Update the rotation angle
  // angle += 0.01;

  // Request the next frame
  requestAnimationFrame(render);
}

// Start the rendering loop
render();
