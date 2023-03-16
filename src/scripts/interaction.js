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
triplePlaneShape = new Shape(triplePlane,[0,0,1],gl.TRIANGLE_FAN)
shapes[triplePlaneShape.id] = triplePlaneShape
console.log(triplePlaneShape.id)
redraw()