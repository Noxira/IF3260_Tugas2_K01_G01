var choosenShapeID = 0
shapes = {}
var lastViewAngle = 0
var viewMatrix = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]

function redraw(){
    for(let id in shapes){
        shapes[id].materialize()
    }
}

var sliderX = document.getElementById("sliderRotationX")
sliderX.addEventListener("input",function(e){
    if(choosenShapeID != null){
        shapes[choosenShapeID].rotateX(sliderX.value)
        redraw()
    }
})

var sliderY = document.getElementById("sliderRotationY")
sliderY.addEventListener("input",function(e){
    if(choosenShapeID != null){
        shapes[choosenShapeID].rotateY(sliderY.value)
        redraw()
    }
})

var sliderZ = document.getElementById("sliderRotationZ")
sliderZ.addEventListener("input",function(e){
    if(choosenShapeID != null){
        shapes[choosenShapeID].rotateZ(sliderZ.value)
        redraw()
    }
})

var sliderCamera = document.getElementById("sliderRotationCamera")
sliderCamera.addEventListener("input",function(e){
    let rotationViewMatrix = getRotationYMatrix(sliderCamera.value-lastViewAngle)
    viewMatrix = multiplyMatrix(rotationViewMatrix,viewMatrix)
    lastViewAngle = sliderCamera.value
    redraw()
})


// Dummy data
triplePrismShape = new Shape(triplePrism,normalTriplePrism,[0.2, 1, 0.2],gl.TRIANGLE_FAN)
shapes[triplePrismShape.id] = triplePrismShape
simplePyramidShape = new Shape(simplePyramidVertices(),normalTriplePrism,[0.2, 1, 0.2],gl.TRIANGLE_FAN)
simplePyramidShape.setId(1);
shapes[simplePyramidShape.id] = simplePyramidShape

// let pyramid = new Shape(pyramid,,[0.2, 1, 0.2],gl.TRIANGLE_FAN) 

redraw()