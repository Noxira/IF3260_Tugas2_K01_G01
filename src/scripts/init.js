//Variable Declaration and Initialization 
var canvas = document.getElementById("canvas");
var gl = canvas.getContext("webgl2");
var vertexShader = gl.createShader(gl.VERTEX_SHADER);
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
var program = gl.createProgram();
var vertexBuffer = gl.createBuffer();
var positionAttribLocation;
var colorAttribLocation;
var normalAttribLocation;
var reverseLightDirectionLocation;
var modelMatrixLocation;
var shadderSource;


//Initialize the WebGL
function init() {
    //Check if webgl is supported
    if (!gl) {
        alert("WebGL is not supported");
        return;
    }

    //Set the Canvas
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.enable(gl.DEPTH_TEST);

    gl.depthFunc(gl.LEQUAL);

    //Create Shadder
    const shadderSource = {
        vertexShaderSource: `#version 300 es
        in vec3 vertPosition;
        in vec3 vertColor;
        in vec3 a_normal;
        uniform mat4 modelMatrix;
        out vec4 fragColor;
        out vec3 vnormal;
    
        void main() {
            fragColor = vec4(vertColor,1);
            gl_PointSize = 20.0;
            gl_Position = modelMatrix * vec4(vertPosition, 1);

            vnormal = a_normal;
        }`,

        fragmentShaderSource: `#version 300 es
        precision mediump float;
        in vec3 vnormal;
        in vec4 fragColor;
        out vec4 outColor;
    
        void main() {
            outColor = fragColor;
            
            vec3 vReverseLightDir = vec3(0.0,0.0,1.0);
            float ratio = 0.5 * max(dot(vnormal,vReverseLightDir),0.0f);
            outColor.rgb *= ratio + 0.5;
        }`
    }
    gl.shaderSource(vertexShader, shadderSource.vertexShaderSource);
    gl.shaderSource(fragmentShader, shadderSource.fragmentShaderSource);

    //Compile Shadder
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    //Attach Shadder
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    //Link Shadder
    gl.linkProgram(program);

    //Bind the buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // Create Position Attribute
    positionAttribLocation = gl.getAttribLocation(program, "vertPosition");
    gl.vertexAttribPointer(
        positionAttribLocation,
        3,                                      //3 float per vertex (XYZ)
        gl.FLOAT,
        gl.FALSE,
        9 * Float32Array.BYTES_PER_ELEMENT,     //1 vertex = 9 float (XYZRGBN1N2N3)
        0                                       //Position start from the first element
    );

    // Create Color Attribute
    colorAttribLocation = gl.getAttribLocation(program, "vertColor");
    gl.vertexAttribPointer(
        colorAttribLocation,
        3,                                      //3 float per vertex (RGB)
        gl.FLOAT,
        gl.FALSE,
        9 * Float32Array.BYTES_PER_ELEMENT,     //1 vertex = 9 float (XYZRGBN1N2N3)
        3 * Float32Array.BYTES_PER_ELEMENT      //Color start from the fourth element
    );

    // Create normal attribute
    normalAttribLocation = gl.getAttribLocation(program, "a_normal");
    gl.vertexAttribPointer(
        normalAttribLocation,
        3,                                      //3 float per vertex (N1N2N3)
        gl.FLOAT,
        gl.FALSE,
        9 * Float32Array.BYTES_PER_ELEMENT,     //1 vertex = 9 float (XYRGBN1N2N3)
        6 * Float32Array.BYTES_PER_ELEMENT      //Normals start from the fourth element
    );

    modelMatrixLocation = gl.getUniformLocation(program,"modelMatrix")

    
    //Enable the attribute
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);
    gl.enableVertexAttribArray(normalAttribLocation);

    if ( !gl.getProgramParameter( program, gl.LINK_STATUS) ) {
        var info = gl.getProgramInfoLog(program);
        throw new Error('Could not compile WebGL program. \n\n' + info);
      }
      

    //Start the program
    gl.useProgram(program);
}

//Initialize the WebGL
init();