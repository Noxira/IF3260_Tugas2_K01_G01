const l = 0.5/2
const w = 0.4/2
const z = 0.2/2
const d = 0.07/2

var baseTriplePrism = [
    // vertical plane
    // 1. front side
    -w,-l,-z,   w,-l,-z,  w,-l+d,-z,   -w,-l+d,-z,
    -w,l,-z,   w,l,-z,   w,l-d,-z,  -w,l-d,-z,
    -w,-l,-z,  -w+d,-l,-z,  -w+d,l,-z,  -w,l,-z,
    w,-l,-z,  w-d,-l,-z,  w-d,l,-z,  w,l,-z,
    // 2. back side
    -w,-l,-z-d,   w,-l,-z-d,  w,-l+d,-z-d,   -w,-l+d,-z-d,
    -w,l,-z-d,   w,l,-z-d,   w,l-d,-z-d,  -w,l-d,-z-d,
    -w,-l,-z-d,  -w+d,-l,-z-d,  -w+d,l,-z-d,  -w,l,-z-d,
    w,-l,-z-d,  w-d,-l,-z-d,  w-d,l,-z-d,  w,l,-z-d,
    // 3. edge out side
    -w,-l,-z-d,  w,-l,-z-d,  w,-l,-z,  -w,-l,-z,
    -w,l,-z,  w,l,-z,  w,l,-z-d,  -w,l,-z-d,
    -w,-l,-z-d,  -w,-l,-z,  -w,l,-z,  -w,l,-z-d,
    w,-l,-z-d,  w,-l,-z,  w,l,-z,  w,l,-z-d,
    // 3. edge in side
]

var baseNormalTriplePrism = [
    // vertical plane
    // 1. front side
    0,0,1,  0,0,1,  0,0,1,  0,0,1,
    0,0,1,  0,0,1,  0,0,1,  0,0,1,
    0,0,1,  0,0,1,  0,0,1,  0,0,1,
    0,0,1,  0,0,1,  0,0,1,  0,0,1,
    // 2. back side
    0,0,-1,  0,0,-1,  0,0,-1,  0,0,-1,
    0,0,-1,  0,0,-1,  0,0,-1,  0,0,-1,
    0,0,-1,  0,0,-1,  0,0,-1,  0,0,-1,
    0,0,-1,  0,0,-1,  0,0,-1,  0,0,-1,
    // 3. edge out side
    0,-1,0,  0,-1,0,  0,-1,0,  0,-1,0,
    0,1,0,  0,1,0,  0,1,0,  0,1,0,
    -1,0,0,  -1,0,0,  -1,0,0,  -1,0,0,
    1,0,0,  1,0,0,  1,0,0,  1,0,0
]

var cek = [1,2,3]

var triplePrism = baseTriplePrism
var normalTriplePrism = baseNormalTriplePrism


function generateTriplePrism(){
    let rotatedTriplePrism1 = new Shape(baseTriplePrism,baseNormalTriplePrism,[0,0,1],gl.TRIANGLE_FAN)
    rotatedTriplePrism1.rotateX(90)
    rotatedTriplePrism1.rotateY(90)

    let rotatedTriplePrism2 = new Shape(baseTriplePrism,baseNormalTriplePrism,[0,0,1],gl.TRIANGLE_FAN)
    rotatedTriplePrism2.rotateY(90)
    rotatedTriplePrism2.rotateX(90)

    let vertices1 = rotatedTriplePrism1.getTransformedVertices()
    let normal1 = rotatedTriplePrism1.getTransformedNormal()
    let vertices2 = rotatedTriplePrism2.getTransformedVertices()
    let normal2 = rotatedTriplePrism2.getTransformedNormal()

    for(let i=0;i<vertices1.length;i++){
        triplePrism.push(vertices1[i])
        normalTriplePrism.push(normal1[i])
    }
    for(let i=0;i<vertices2.length;i++){
        triplePrism.push(vertices2[i])
        normalTriplePrism.push(normal2[i])
    }
    let modifiedTriplePrism = new Shape(baseTriplePrism,normalTriplePrism,[0,0,1],gl.TRIANGLE_FAN)
    // modifiedTriplePrism.rotateX(20)
    // modifiedTriplePrism.rotateY(-58)

    triplePrism = modifiedTriplePrism.getTransformedVertices()

    Shape.ID = 0
}

generateTriplePrism()

var pyramidVertices = [
    //bottom face
    -0.2,-0.2,0.2, -0.18,-0.2,0.2, -0.18,-0.2,-0.2, -0.2,-0.2,-0.2,
    0.18,-0.2,0.2, 0.2,-0.2,0.2, 0.2,-0.2,-0.2, 0.18,-0.2,-0.2,
    -0.2,-0.2,0.2, 0.2,-0.2,0.2, 0.2,-0.2,0.18, -0.2,-0.2,0.18,
    -0.2,-0.2,-0.2, 0.2,-0.2,-0.2, 0.2,-0.2,-0.18, -0.2,-0.2,-0.18,
  
    //right face
    0.2,-0.2,0.2, 0.2,-0.2,0.18, 0,0.2,-0.01, 0,0.2,0.01,
    0.2,-0.2,-0.2, 0.2,-0.2,-0.18, 0,0.2,0.01, 0,0.2,-0.01,
    0.2,-0.2,0.2, 0.2,-0.2,-0.2, 0.18,-0.18,-0.18, 0.18,-0.18,0.18,
  
    //front face
    -0.2,-0.2,0.2, 0.2,-0.2,0.2, 0.18,-0.18,0.18, -0.18,-0.18,0.18,
    -0.2,-0.2,0.2, -0.18,-0.2,0.2, 0.02,0.2,0.02, 0,0.2,0.02,
    0.18,-0.2,0.2, 0.2,-0.2,0.2, 0.02,0.2,0.02, 0,0.2,0.02,
  
    //left face
    -0.2,-0.2,0.2, -0.2,-0.2,0.18, 0,0.2,-0.01, 0,0.2,0.01,
    -0.2,-0.2,-0.2, -0.2,-0.2,-0.18, 0,0.2,0.01, 0,0.2,-0.01,
    -0.2,-0.2,0.2, -0.2,-0.2,-0.2, -0.18,-0.18,-0.18, -0.18,-0.18,0.18,
  
    //back face
    -0.2,-0.2,-0.2, 0.2,-0.2,-0.2, 0.18,-0.18,-0.18, -0.18,-0.18,-0.18,
    -0.2,-0.2,-0.2, -0.18,-0.2,-0.2, 0.02,0.2,0.02, 0,0.2,0.02,
    0.18,-0.2,-0.2, 0.2,-0.2,-0.2, 0.02,0.2,0.02, 0,0.2,0.02,
  ];

function simplePyramidVertices() {
    let tempPyramid = []

    for (var i = 0; i < 12*4*4; i++){
        if(i % 3 == 0){
            tempPyramid.push(pyramidVertices[i]+0.7);
       }
       else{
            tempPyramid.push(pyramidVertices[i]);
       }
    }
    
    return tempPyramid;
}