const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

if (!gl) {
  alert("WebGL is not supported in your browser.");
}

const vertices = new Float32Array([-0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5]);

const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const vsSource = `
    attribute vec2 aPosition;
    void main(void) {
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vsSource);
gl.compileShader(vertexShader);

const fsSource = `
    void main(void) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
`;

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fsSource);
gl.compileShader(fragmentShader);

const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);

gl.useProgram(shaderProgram);

const aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
gl.enableVertexAttribArray(aPosition);
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
