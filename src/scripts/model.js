const l = 0.5
const w = 0.4
const z = 0.2
const d = 0.07

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
    -w,-l+d,-z-d,  w,-l+d,-z-d,  w,-l+d,-z,  -w,-l+d,-z,
    -w,l-d,-z,  w,l-d,-z,  w,l-d,-z-d,  -w,l-d,-z-d,
    -w+d,-l,-z-d,  -w+d,-l,-z,  -w+d,l,-z,  -w+d,l,-z-d,
    w-d,-l,-z-d,  w-d,-l,-z,  w-d,l,-z,  w-d,l,-z-d,
]

var triplePrism = baseTriplePrism


function generateTriplePrism(){
    let rotatedTriplePrism1 = new Shape(baseTriplePrism,[0,0,1],gl.TRIANGLE_FAN)
    rotatedTriplePrism1.rotateX(90)
    rotatedTriplePrism1.rotateY(90)

    let rotatedTriplePrism2 = new Shape(baseTriplePrism,[0,0,1],gl.TRIANGLE_FAN)
    rotatedTriplePrism2.rotateY(90)
    rotatedTriplePrism2.rotateX(90)

    let vertices1 = rotatedTriplePrism1.getTransformedVertices()
    let vertices2 = rotatedTriplePrism2.getTransformedVertices()

    for(let i=0;i<vertices1.length;i++){
        triplePrism.push(vertices1[i])
    }
    for(let i=0;i<vertices2.length;i++){
        triplePrism.push(vertices2[i])
    }

    let modifiedTriplePrism = new Shape(triplePrism,[0,0,1],gl.TRIANGLE_FAN)
    modifiedTriplePrism.rotateX(20)
    modifiedTriplePrism.rotateY(-58)

    triplePrism = modifiedTriplePrism.getTransformedVertices()

    Shape.ID = 0
}

generateTriplePrism()