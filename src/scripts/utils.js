let objectPicker = document.getElementById('objectlist');
objectPicker.selectedIndex = 0;

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
    for (let i = 0; i < vertices.length; i++) {
        if (i % 3 == 0) {
            ret[0] += vertices[i];
        } else if (i % 3 == 1) {
            ret[1] += vertices[i];
        } else {
            ret[2] += vertices[i];
        }
        ret[0] /= (vertices.length / 3);
        ret[1] /= (vertices.length / 3);
        ret[2] /= (vertices.length / 3);
    }
    console.log(vertices.length);
    return ret
}

function getTranslationMatrix(x, y, z) {
    mat = [[1, 0, 0, x], [0, 1, 0, y], [0, 0, 1, z], [0, 0, 0, 1]]
    return mat
}

function updateObjectChosen() {
    choosenShapeID = objectPicker.value
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