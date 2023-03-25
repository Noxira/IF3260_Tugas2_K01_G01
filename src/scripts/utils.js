let objectPicker = document.getElementById('objectlist');
objectPicker.selectedIndex = 0;
let projectionPicker = document.getElementById('projection_selector');
projectionPicker.selectedIndex = 0;
document.getElementById('inputFile').value = null;

function min(x, y) {
    if (x < y) {
        return x;
    }
    return y;
}

function max(x, y) {
    if (x > y) {
        return x;
    }
    return y;
}

function toRad(x) {
    return x / (180 / Math.PI)
}

function multiplyMatrix(m1, m2) {
    let ret = []
    for (let i = 0; i < m1.length; i++) {
        ret.push([])
        for (let j = 0; j < m2[0].length; j++) {
            ret[i].push(0)
            for (let k = 0; k < m1[0].length; k++) {
                ret[i][j] += m1[i][k] * m2[k][j]
            }
        }
    }
    return ret
}

function getRotationXMatrix(x) {
    x = toRad(x)
    c = Math.cos(x)
    s = Math.sin(x)

    let mat = [[1, 0, 0, 0], [0, c, -s, 0], [0, s, c, 0], [0, 0, 0, 1]]
    return mat
}

function getRotationYMatrix(x) {
    x = toRad(x)
    c = Math.cos(x)
    s = Math.sin(x)

    let mat = [[c, 0, s, 0], [0, 1, 0, 0], [-s, 0, c, 0], [0, 0, 0, 1]]
    return mat
}

function getRotationZMatrix(x) {
    x = toRad(x)
    c = Math.cos(x)
    s = Math.sin(x)

    let mat = [[c, -s, 0, 0], [s, c, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]
    return mat
}

function getCenterPoint(vertices) {
    let ret = [0, 0, 0]
    let mnm = [1, 1, 1]
    let mxm = [-1, -1, -1]
    // console.log(vertices)
    for (let i = 0; i < vertices.length; i++) {
        if (i % 3 == 0) {
            mnm[0] = min(mnm[0], vertices[i])
            mxm[0] = max(mxm[0], vertices[i])
        } else if (i % 3 == 1) {
            mnm[1] = min(mnm[1], vertices[i])
            mxm[1] = max(mxm[1], vertices[i])
        } else {
            mnm[2] = min(mnm[2], vertices[i])
            mxm[2] = max(mxm[2], vertices[i])
        }
    }
    for (let i = 0; i < 3; i++) {
        ret[i] = (mnm[i] + mxm[i]) / 2
    }
    // console.log(ret);
    return ret
}

function getTranslationMatrix(x, y, z) {
    let mat = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [x, y, z, 1]]
    return mat
}

function getScalingMatrix(x, y, z) {
    let mat = [[x, 0, 0, 0], [0, y, 0, 0], [0, 0, z, 0], [0, 0, 0, 1]]
    return mat
}

function updateObjectChosen() {
    choosenShapeID = objectPicker.value
    chosenShape = shapes[choosenShapeID]
    updateAngleValue(shapes[choosenShapeID].curAngleX, shapes[choosenShapeID].curAngleY, shapes[choosenShapeID].curAngleZ)
    updateTranslationValue(shapes[choosenShapeID].translateX, shapes[choosenShapeID].translateY, shapes[choosenShapeID].translateZ)
    updateScaleValue(shapes[choosenShapeID].scaleX, shapes[choosenShapeID].scaleY, shapes[choosenShapeID].scaleZ)
}

function updateAngleValue(x, y, z){
    sliderX.value = x;
    sliderY.value = y;
    sliderZ.value = z;
    if (x != 0){
        labelRotationX.innerHTML = x.toString() + "°"
    } else { labelRotationX.innerHTML = ""}
    if (y != 0){
        labelRotationY.innerHTML = y.toString() + "°"
    } else { labelRotationY.innerHTML = ""}
    if (z != 0){
        labelRotationZ.innerHTML = z.toString() + "°"
    } else { labelRotationZ.innerHTML = ""}
}

function updateTranslationValue(x, y, z){
    sliderTranslationX.value = x;
    sliderTranslationY.value = y;
    sliderTranslationZ.value = z;
    if (x != 0){
        labelTranslationX.innerHTML = x.toString()
    } else { labelTranslationX.innerHTML = ""}
    if (y != 0){
        labelTranslationY.innerHTML = y.toString()
    } else { labelTranslationY.innerHTML = ""}
    if (z != 0){
        labelTranslationZ.innerHTML = z.toString()
    } else { labelTranslationZ.innerHTML = ""}
}

function updateScaleValue(x, y, z){
    sliderScalingX.value = x * 500;
    sliderScalingY.value = y * 500;
    sliderScalingZ.value = z * 500;
    if (x != 1){
        labelScalingX.innerHTML = x.toString() + "x"
    } else { labelScalingX.innerHTML = ""}
    if (y != 1){
        labelScalingY.innerHTML = y.toString() + "x"
    } else { labelScalingY.innerHTML = ""}
    if (z != 1){
        labelScalingZ.innerHTML = z.toString() + "x"
    } else { labelScalingZ.innerHTML = ""}
}

function flatten(mat) {
    let res = []
    for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat[0].length; j++) {
            res.push(mat[i][j])
        }
    }
    return res
}

function inverse(mat) {

    let m = flatten(mat)
    let inv = []
    for (let i = 0; i < navigator; i++) {
        inv.push(0);
    }

    inv[0] = m[5] * m[10] * m[15] -
        m[5] * m[11] * m[14] -
        m[9] * m[6] * m[15] +
        m[9] * m[7] * m[14] +
        m[13] * m[6] * m[11] -
        m[13] * m[7] * m[10]

    inv[4] = -m[4] * m[10] * m[15] +
        m[4] * m[11] * m[14] +
        m[8] * m[6] * m[15] -
        m[8] * m[7] * m[14] -
        m[12] * m[6] * m[11] +
        m[12] * m[7] * m[10]

    inv[8] = m[4] * m[9] * m[15] -
        m[4] * m[11] * m[13] -
        m[8] * m[5] * m[15] +
        m[8] * m[7] * m[13] +
        m[12] * m[5] * m[11] -
        m[12] * m[7] * m[9]

    inv[12] = -m[4] * m[9] * m[14] +
        m[4] * m[10] * m[13] +
        m[8] * m[5] * m[14] -
        m[8] * m[6] * m[13] -
        m[12] * m[5] * m[10] +
        m[12] * m[6] * m[9]

    inv[1] = -m[1] * m[10] * m[15] +
        m[1] * m[11] * m[14] +
        m[9] * m[2] * m[15] -
        m[9] * m[3] * m[14] -
        m[13] * m[2] * m[11] +
        m[13] * m[3] * m[10]

    inv[5] = m[0] * m[10] * m[15] -
        m[0] * m[11] * m[14] -
        m[8] * m[2] * m[15] +
        m[8] * m[3] * m[14] +
        m[12] * m[2] * m[11] -
        m[12] * m[3] * m[10]

    inv[9] = -m[0] * m[9] * m[15] +
        m[0] * m[11] * m[13] +
        m[8] * m[1] * m[15] -
        m[8] * m[3] * m[13] -
        m[12] * m[1] * m[11] +
        m[12] * m[3] * m[9]

    inv[13] = m[0] * m[9] * m[14] -
        m[0] * m[10] * m[13] -
        m[8] * m[1] * m[14] +
        m[8] * m[2] * m[13] +
        m[12] * m[1] * m[10] -
        m[12] * m[2] * m[9]

    inv[2] = m[1] * m[6] * m[15] -
        m[1] * m[7] * m[14] -
        m[5] * m[2] * m[15] +
        m[5] * m[3] * m[14] +
        m[13] * m[2] * m[7] -
        m[13] * m[3] * m[6]

    inv[6] = -m[0] * m[6] * m[15] +
        m[0] * m[7] * m[14] +
        m[4] * m[2] * m[15] -
        m[4] * m[3] * m[14] -
        m[12] * m[2] * m[7] +
        m[12] * m[3] * m[6]

    inv[10] = m[0] * m[5] * m[15] -
        m[0] * m[7] * m[13] -
        m[4] * m[1] * m[15] +
        m[4] * m[3] * m[13] +
        m[12] * m[1] * m[7] -
        m[12] * m[3] * m[5]

    inv[14] = -m[0] * m[5] * m[14] +
        m[0] * m[6] * m[13] +
        m[4] * m[1] * m[14] -
        m[4] * m[2] * m[13] -
        m[12] * m[1] * m[6] +
        m[12] * m[2] * m[5]

    inv[3] = -m[1] * m[6] * m[11] +
        m[1] * m[7] * m[10] +
        m[5] * m[2] * m[11] -
        m[5] * m[3] * m[10] -
        m[9] * m[2] * m[7] +
        m[9] * m[3] * m[6]

    inv[7] = m[0] * m[6] * m[11] -
        m[0] * m[7] * m[10] -
        m[4] * m[2] * m[11] +
        m[4] * m[3] * m[10] +
        m[8] * m[2] * m[7] -
        m[8] * m[3] * m[6]

    inv[11] = -m[0] * m[5] * m[11] +
        m[0] * m[7] * m[9] +
        m[4] * m[1] * m[11] -
        m[4] * m[3] * m[9] -
        m[8] * m[1] * m[7] +
        m[8] * m[3] * m[5]

    inv[15] = m[0] * m[5] * m[10] -
        m[0] * m[6] * m[9] -
        m[4] * m[1] * m[10] +
        m[4] * m[2] * m[9] +
        m[8] * m[1] * m[6] -
        m[8] * m[2] * m[5]

    let koef = 1 / (m[0] * inv[0] + m[1] * inv[4] + m[2] * inv[8] + m[3] * inv[12])

    for (let i = 0; i < 16; i++) {
        inv[i] *= koef;
    }

    let ret = []
    for (let i = 0; i < 4; i++) {
        ret.push([]);
        for (let j = 0; j < 4; j++) {
            ret[i].push(inv[i * 4 + j])
        }
    }
    return ret
}

function transpose(mat) {
    let ret = []
    for (let i = 0; i < 4; i++) {
        ret.push([]);
        for (let j = 0; j < 4; j++) {
            ret[i].push(mat[j][i])
        }
    }
    return ret
}

function translation(tx, ty, tz) {
    return [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [tx, ty, tz, 1],
    ];
}

function updateProjectionChosen() {
    let projectionChosen = projectionPicker.value;
    // switch case projectionChosen for 0, 1, 2
    if (projectionChosen == 0) {
        changeToOrtho()
    }
    else if (projectionChosen == 1) {
        changeToOblique()
    }
    else if (projectionChosen == 2) {
        changeToPerspective()
    }
}

function resetObjectLabels(){
    labelTranslationX.innerHTML = ""
    labelTranslationY.innerHTML = ""
    labelTranslationZ.innerHTML = ""
    labelScalingX.innerHTML = ""
    labelScalingY.innerHTML = ""
    labelScalingZ.innerHTML = ""
    labelRotationX.innerHTML = ""
    labelRotationY.innerHTML = ""
    labelRotationZ.innerHTML = ""
    sliderX.value = 0
    sliderY.value = 0
    sliderZ.value = 0
    sliderTranslationX.value = 0
    sliderTranslationY.value = 0
    sliderTranslationZ.value = 0
    sliderScalingX.value = 500
    sliderScalingY.value = 500
    sliderScalingZ.value = 500
}