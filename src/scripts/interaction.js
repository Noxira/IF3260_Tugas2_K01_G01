var choosenShapeID = 0
shapes = {}
var lastViewAngle = 0
var viewMatrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]
var currentRadius = 2.5;

function redraw() {
    for (let id in shapes) {
        shapes[id].materialize()
    }
}

var sliderX = document.getElementById("sliderRotationX")
sliderX.addEventListener("input", function (e) {
    if (choosenShapeID != null) {
        shapes[choosenShapeID].rotateX(sliderX.value)
        redraw()
    }
})

var sliderY = document.getElementById("sliderRotationY")
sliderY.addEventListener("input", function (e) {
    if (choosenShapeID != null) {
        shapes[choosenShapeID].rotateY(sliderY.value)
        redraw()
    }
})

var sliderZ = document.getElementById("sliderRotationZ")
sliderZ.addEventListener("input", function (e) {
    if (choosenShapeID != null) {
        shapes[choosenShapeID].rotateZ(sliderZ.value)
        redraw()
    }
})

var sliderCamera = document.getElementById("sliderRotationCamera")
sliderCamera.addEventListener("input", function (e) {
    let center = [0, 0, 2.5 - currentRadius]

    let translationMatrix1 = getTranslationMatrix(-center[0], -center[1], -center[2])
    viewMatrix = multiplyMatrix(translationMatrix1, viewMatrix)

    let rotationViewMatrix = getRotationYMatrix(sliderCamera.value - lastViewAngle)
    viewMatrix = multiplyMatrix(rotationViewMatrix, viewMatrix)

    let translationMatrix2 = getTranslationMatrix(center[0], center[1], center[2])
    viewMatrix = multiplyMatrix(translationMatrix2, viewMatrix)

    lastViewAngle = sliderCamera.value

    redraw()
})

var sliderZoom = document.getElementById("sliderZoomCamera")
sliderZoom.addEventListener("input", function (e) {
    currentRadius = 2.5 - sliderZoom.value / 40

    let center = [0, 0, 2.5 - currentRadius]

    viewMatrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]

    let rotationViewMatrix = getRotationYMatrix(lastViewAngle)
    viewMatrix = multiplyMatrix(rotationViewMatrix, viewMatrix)

    let translationMatrix2 = getTranslationMatrix(center[0], center[1], center[2])
    viewMatrix = multiplyMatrix(translationMatrix2, viewMatrix)

    redraw()
})


// Dummy data
triplePrismShape = new Shape(triplePrism, normalTriplePrism, [0.2, 1, 0.2], gl.TRIANGLE_FAN)
shapes[triplePrismShape.id] = triplePrismShape
simplePyramidShape = new Shape(simplePyramidVertices(), normalTriplePrism, [0.2, 1, 0.2], gl.TRIANGLE_FAN)
simplePyramidShape.setId(1);
shapes[simplePyramidShape.id] = simplePyramidShape
trianglePrismShape = new Shape(trianglePrism, normalTriplePrism, [0.2, 1, 0.2], gl.TRIANGLE_FAN)
trianglePrismShape.setId(2);
shapes[trianglePrismShape.id] = trianglePrismShape;
// let pyramid = new Shape(pyramid,,[0.2, 1, 0.2],gl.TRIANGLE_FAN) 

redraw()