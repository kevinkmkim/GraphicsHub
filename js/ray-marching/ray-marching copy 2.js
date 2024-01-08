// Initialize WebGL
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
if (!gl) {
  alert("WebGL not supported in your browser.");
}

// Vertex shader program
const vsSource = `
            attribute vec4 a_position;
            uniform mat4 uModelViewMatrix;
            void main(void) {
                gl_Position = a_position;
            }
        `;

// Fragment shader program
const fsSource = `
            precision mediump float;
            void main(void) {
                gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
            }
        `;

// Create and compile shaders
function compileShader(source, type) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(
      "An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader)
    );
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

const vertexShader = compileShader(vsSource, gl.VERTEX_SHADER);
const fragmentShader = compileShader(fsSource, gl.FRAGMENT_SHADER);

// Create shader program
const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
  console.error(
    "Unable to initialize the shader program: " +
      gl.getProgramInfoLog(shaderProgram)
  );
}
gl.useProgram(shaderProgram);

// Create a buffer for the ray's position
// const vertices = new Float32Array([
//   0.0, 0.0, 
//   0.5, 0.0
// ]);

// const vertexBuffer = gl.createBuffer();
// gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

// gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);




const positionAttributeLocation = gl.getAttribLocation(shaderProgram, "a_position");
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
// Define a point for the ray origin
const point = [0.0, 0.0];
// Define a direction vector for the ray
const direction = [0.5, 0.5];
// Calculate the endpoint of the ray
const endPoint = [point[0] + direction[0], point[1] + direction[1]];

const positions = [...point, ...endPoint];

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);





// Get the attribute and uniform locations
// const vertexPosition = gl.getAttribLocation(shaderProgram, "aVertexPosition");
// const modelViewMatrix = gl.getUniformLocation(
//   shaderProgram,
//   "uModelViewMatrix"
// );






// Configure the vertex position attribute

// gl.enableVertexAttribArray(vertexPosition);
// gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);


gl.enableVertexAttribArray(positionAttributeLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);


const size = 2;
const type = gl.FLOAT;
const normalize = false;
const stride = 0;
const offset = 0;
gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

// Initialize rotation angle
// let angle = 0.0;

// Animation loop
function drawScene() {
  // angle += 0.01;

  // Clear the canvas
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Update the rotation matrix
  // const rotationMatrix = mat4.create();
  // mat4.fromZRotation(rotationMatrix, angle);

  // Set the rotation matrix
  // gl.uniformMatrix4fv(modelViewMatrix, false, rotationMatrix);

  // Draw the ray
  gl.drawArrays(gl.LINES, 0, 2);

  // Request the next frame
  requestAnimationFrame(drawScene);
}

drawScene();
