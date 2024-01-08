// Initialize WebGL
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
if (!gl) {
  alert("WebGL not supported in your browser.");
}

// Vertex shader program
const vsSource = `
            attribute vec4 aVertexPosition;
            uniform mat4 uModelViewMatrix;
            void main(void) {
              gl_Position = uModelViewMatrix * aVertexPosition;
            }
        `;

// Fragment shader program
const fsSource = `
            precision mediump float;
            uniform vec2 u_resolution; // Resolution of the canvas
            uniform float u_time;     // Time in seconds

            void main(void) {

                vec2 st = gl_FragCoord.xy/u_resolution.xy;
                st.x *= u_resolution.x/u_resolution.y;
            
                vec3 color = vec3(0.0);
                color = vec3(st.x,st.y,abs(sin(u_time)));
            
                gl_FragColor = vec4(color,1.0);

                // gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
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

const uResolutionLocation = gl.getUniformLocation(
  shaderProgram,
  "u_resolution"
);
const uTimeLocation = gl.getUniformLocation(shaderProgram, "u_time");

gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);

const time = performance.now(); // You can use this to get a time value
gl.uniform1f(uTimeLocation, time / 1000.0);

// Create a buffer for the ray's position
// const vertices = new Float32Array([
//   0.0, 0.0,
//   0.5, 0.0
// ]);

// const vertexBuffer = gl.createBuffer();
// gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

// gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const positionAttributeLocation = gl.getAttribLocation(
  shaderProgram,
  "aVertexPosition"
);
const modelViewMatrix = gl.getUniformLocation(
  shaderProgram,
  "uModelViewMatrix"
);

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
// Define a point for the ray origin
const point = [0.0, 0.0];
// Define a direction vector for the ray
const direction = [1.0, 1.0];
// Calculate the endpoint of the ray
const endPoint = [point[0] + direction[0], point[1] + direction[1]];

const positions = [...point, ...endPoint];

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

gl.enableVertexAttribArray(positionAttributeLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

// Initialize rotation angle
let angle = 0.0;

// Animation loop
function drawScene() {
  angle += 0.01;

  // Clear the canvas
  gl.clearColor(1.0, 1.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Update the rotation matrix
  const rotationMatrix = mat4.create();
  mat4.fromZRotation(rotationMatrix, angle);

  // Set the rotation matrix
  gl.uniformMatrix4fv(modelViewMatrix, false, rotationMatrix);

  // Draw the ray
  gl.drawArrays(gl.LINES, 0, 2);

  // Request the next frame
  requestAnimationFrame(drawScene);
}

drawScene();

canvas.addEventListener("mousedown", function (event) {
  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / canvas.width) * 2 - 1;
  const y = -((event.clientY - rect.top) / canvas.height) * 2 + 1;
  point[0] = x;
  point[1] = y;
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(point), gl.STATIC_DRAW);
  drawScene();
});
