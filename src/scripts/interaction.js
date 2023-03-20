var choosenShapeID = 0
shapes = {}

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


// Dummy data
console.log("panjang")
console.log(triplePrism.length)
console.log(normalTriplePrism.length)
triplePrismShape = new Shape(triplePrism,normalTriplePrism,[0.2, 1, 0.2],gl.TRIANGLE_FAN)
shapes[triplePrismShape.id] = triplePrismShape
console.log(triplePrismShape.id)
simplePyramidShape = new Shape(simplePyramidVertices(),normalTriplePrism,[0.2, 1, 0.2],gl.TRIANGLE_FAN)
simplePyramidShape.setId(1);
shapes[simplePyramidShape.id] = simplePyramidShape

// let pyramid = new Shape(pyramid,,[0.2, 1, 0.2],gl.TRIANGLE_FAN) 

redraw()