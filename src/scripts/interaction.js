var choosenShapeID = 0
shapes = {}
var lastViewAngle = 0
var viewMatrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]
var currentRadius = 2.5;

function redraw() {
    for (let id in shapes) {
        console.log('draw')
        console.log(id)
        shapes[id].materialize()
    }
}

var sliderTranslationX = document.getElementById("sliderTranslationX")
var sliderTranslationY = document.getElementById("sliderTranslationY")
var sliderTranslationZ = document.getElementById("sliderTranslationZ")

sliderTranslationX.addEventListener("input", function (e) {
    if (choosenShapeID != null) {
        shapes[choosenShapeID].translate(sliderTranslationX.value / 100, sliderTranslationY.value / 100, sliderTranslationZ.value / 100)
        document.getElementById('outputTranslationX').innerHTML = sliderTranslationX.value / 100
        redraw()
    }
})

sliderTranslationY.addEventListener("input", function (e) {
    if (choosenShapeID != null) {
        shapes[choosenShapeID].translate(sliderTranslationX.value / 100, sliderTranslationY.value / 100, sliderTranslationZ.value / 100)
        document.getElementById('outputTranslationY').innerHTML = sliderTranslationY.value / 100
        redraw()
    }
})

sliderTranslationZ.addEventListener("input", function (e) {
    if (choosenShapeID != null) {
        shapes[choosenShapeID].translate(sliderTranslationX.value / 100, sliderTranslationY.value / 100, sliderTranslationZ.value / 100)
        document.getElementById('outputTranslationZ').innerHTML = sliderTranslationZ.value / 100
        redraw()
    }
})

// scalling
var sliderScalingX = document.getElementById("sliderScalingX")
var sliderScalingY = document.getElementById("sliderScalingY")
var sliderScalingZ = document.getElementById("sliderScalingZ")

sliderScalingX.addEventListener("input", function (e) {
    if (choosenShapeID != null) {
        shapes[choosenShapeID].scale(sliderScalingX.value / 500, sliderScalingY.value / 500, sliderScalingZ.value / 500)
        document.getElementById('outputSx').innerHTML = (sliderScalingX.value / 500).toString() + "x"
        redraw()
    }
})

sliderScalingY.addEventListener("input", function (e) {
    if (choosenShapeID != null) {
        shapes[choosenShapeID].scale(sliderScalingX.value / 500, sliderScalingY.value / 500, sliderScalingZ.value / 500)
        document.getElementById('outputSy').innerHTML = (sliderScalingY.value / 500).toString() + "x"
        redraw()
    }
})

sliderScalingZ.addEventListener("input", function (e) {
    if (choosenShapeID != null) {
        shapes[choosenShapeID].scale(sliderScalingX.value / 500, sliderScalingY.value / 500, sliderScalingZ.value / 500)
        document.getElementById('outputSz').innerHTML = (sliderScalingZ.value / 500).toString() + "x"
        redraw()
    }
})

var sliderX = document.getElementById("sliderRotationX")
sliderX.addEventListener("input", function (e) {
    if (choosenShapeID != null) {
        shapes[choosenShapeID].rotateX(sliderX.value)
        document.getElementById('outputRotationX').innerHTML = sliderX.value.toString() + "°"
        redraw()
    }
})

var sliderY = document.getElementById("sliderRotationY")
sliderY.addEventListener("input", function (e) {
    if (choosenShapeID != null) {
        shapes[choosenShapeID].rotateY(sliderY.value)
        document.getElementById('outputRotationY').innerHTML = sliderY.value.toString() + "°"
        redraw()
    }
})

var sliderZ = document.getElementById("sliderRotationZ")
sliderZ.addEventListener("input", function (e) {
    if (choosenShapeID != null) {
        shapes[choosenShapeID].rotateZ(sliderZ.value)
        document.getElementById('outputRotationZ').innerHTML = sliderZ.value.toString() + "°"
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

    document.getElementById('outputRotationCamera').innerHTML = sliderCamera.value.toString() + "°"
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

    // document.getElementById('outputZoomCamera').innerHTML = sliderZoom.value.toString() + "°"
    redraw()
})

var shadingCheckBox = document.getElementById("isShading")
shadingCheckBox.addEventListener("change", function (e) {
    if (this.checked) {
        shading = true;
    } else {
        shading = false;
    }
    redraw()
})

var resetBtn = document.getElementById("resetBtn")
resetBtn.addEventListener("click", function (e) {
    viewMatrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]
    projectionPicker.selectedIndex = 0;
    objectPicker.selectedIndex = 0;
    currentRadius = 2.5;
    for (let id in shapes) {
        shapes[id].resetTransformation()
    }
    changeToOrtho()
    sliderX.value = 0
    sliderY.value = 0
    sliderZ.value = 0
    sliderCamera.value = 0
    sliderZoom.value = 0
    redraw()
})

// save
var saveBtn = document.getElementById("saveBtn")
saveBtn.addEventListener("click", function (event) {
    let savedShapes = [];
    for (let i in shapes) {
        let shape = shapes[i];
        // console.log(shape);
        // console.log(shape.vertices)
        // console.log(shape.getTransformedVertices())
        let savedShape = {
            "id": shape.id,
            "vertices": shape.getTransformedVertices(),
            "normal": shape.getTransformedNormal(),
            "color": shape.color,
            "webGLShape": shape.webGLShape
        };
        savedShapes.push(savedShape);
    }
    let json = JSON.stringify(savedShapes);
    let blob = new Blob([json], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = "drawing.json";
    a.click();
    window.URL.revokeObjectURL(url);
});

var loadBtn = document.getElementById("loadBtn")
loadBtn.addEventListener("click", function (event) {
    let file = document.getElementById("inputFile").files[0];
    // console.log(file)
    let reader = new FileReader();
    reader.onload = function (event) {
        let shapesInput = JSON.parse(event.target.result);
        for (let i = 0; i < shapesInput.length; i++) {
            // console.log(shapesInput[i])
            let center = getCenterPoint(shapesInput[i].vertices)
            for(let j=0;j<shapesInput[i].vertices.length;j+=3){
                shapesInput[i].vertices[j] -= center[0]
                shapesInput[i].vertices[j+1] -= center[1]
                shapesInput[i].vertices[j+2] -= center[2]
            }
            let hollowShape = new Shape(shapesInput[i].vertices, shapesInput[i].normal, shapesInput[i].color, shapesInput[i].webGLShape)
            shapes[shapesInput[i].id] = hollowShape
            hollowShape.baseTranslateX = center[0]
            hollowShape.baseTranslateY = center[1]
            hollowShape.baseTranslateZ = center[2]
            hollowShape.setId(shapesInput[i].id)
            console.log("id")
            console.log(shapesInput[i].id)
            // console.log(shapes);
            // if (i % 3 == 0) {
            //     hollowShape.baseTranslateX = -0.7
            // } else if (i % 3 == 1) {
            //     hollowShape.baseTranslateX = 0.7
            // }
        }
        redraw();
    };
    try {
        reader.readAsText(file);
        shapes = {};
    }
    catch (err) {
        alert("No file selected");
    }
});

function openModal(id) {
    document.getElementById(id).classList.add('open');
    document.body.classList.add('jw-modal-open');
}

// close currently open modal
function closeModal() {
    document.querySelector('.jw-modal.open').classList.remove('open');
    document.body.classList.remove('jw-modal-open');
}

window.addEventListener('load', function () {
    // close modals on background click
    document.addEventListener('click', event => {
        if (event.target.classList.contains('jw-modal')) {
            closeModal();
        }
    });
});

// Dummy data
triplePrismShape = new Shape(triplePrism, normalTriplePrism, [0.2, 1, 0.2], gl.TRIANGLE_FAN)
shapes[triplePrismShape.id] = triplePrismShape
simplePyramidShape = new Shape(pyramidVertices, normalTriplePrism, [0.2, 1, 0.2], gl.TRIANGLE_FAN)
simplePyramidShape.setId(1);
simplePyramidShape.baseTranslateX = 0.7
shapes[simplePyramidShape.id] = simplePyramidShape
trianglePrismShape = new Shape(trianglePrism, normalTrianglePrism, [0.2, 1, 0.2], gl.TRIANGLE_FAN)
trianglePrismShape.setId(2);
triplePrismShape.baseTranslateX = -0.7
shapes[trianglePrismShape.id] = trianglePrismShape;
// let pyramid = new Shape(pyramid,,[0.2, 1, 0.2],gl.TRIANGLE_FAN) 

redraw()

function testerFunc() {
    var orthMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
    var stMatrix = getSTMat(-1, 1, -1, 1, 1, 100);
    var newProj = multiplyMatrix(orthMatrix, stMatrix);

    shapes[1].setProjectionMatrix(newProj);
    redraw();
}

function testerFunc2() {
    var perspectiveMatrix = getProjection(30, canvas.width / canvas.height, 1, 100);

    shapes[1].setProjectionMatrix(perspectiveMatrix);
    redraw();
}

function testerFunc3() {
    var shtMat = [[1, 0, 0, 0], [0, 1, 0, 0], [0.3, 0.3, 0, 0], [0, 0, 0, 1]];
    var newProj = multiplyMatrix(translation(0.6, 0.6, 0), shtMat);

    for (var i = 0; i < 3; i++) {
        console.log(i);
        shapes[i].setProjectionMatrix(newProj);
    }
    redraw();
}