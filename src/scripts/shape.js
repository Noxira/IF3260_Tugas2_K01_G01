class Shape {
    static ID = 0

    constructor(vertices, normal, color, webGLShape) {
        this.id = Shape.ID++
        this.webGLShape = webGLShape
        this.vertices = vertices
        this.normal = normal;
        this.color = color
        this.transformationMatrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]
        this.curAngleX = 0
        this.curAngleY = 0
        this.curAngleZ = 0
        this.projection_matrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 1]]

        this.baseTranslateX = 0
        this.baseTranslateY = 0
        this.baseTranslateZ = 0

        this.translateX = 0
        this.translateY = 0
        this.translateZ = 0
    }

    materialize() {
        this.reset()
        this.getTransformedMatrix()
        let vertices = this.vertices
        let normal = this.getTransformedNormal()
        gl.uniformMatrix4fv(projectionMatrixLocation, false, flatten(this.projection_matrix));
        gl.uniformMatrix4fv(modelMatrixLocation, false, flatten(this.transformationMatrix));
        gl.uniformMatrix4fv(viewMatrixLocation, false, flatten(viewMatrix))
        for (let i = 0; i < vertices.length; i += 12) {
            let verticesToDraw = []
            for (let j = 0; j < 12; j += 3) {
                if (shading) {
                    verticesToDraw.push(vertices[i + j], vertices[i + j + 1], vertices[i + j + 2], this.color[0], this.color[1], this.color[2], normal[i + j], normal[i + j + 1], normal[i + j + 2]);
                } else {
                    verticesToDraw.push(vertices[i + j], vertices[i + j + 1], vertices[i + j + 2], this.color[0], this.color[1], this.color[2], 0, 0, 1);
                }
            }
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesToDraw), gl.STATIC_DRAW)
            gl.drawArrays(this.webGLShape, 0, 4)
        }
    }

    rotateX(x) {
        this.curAngleX = x
    }

    rotateY(x) {
        this.curAngleY = x
    }

    rotateZ(x) {
        this.curAngleZ = x
    }

    translate(x, y, z) {
        this.translateX = x
        this.translateY = y
        this.translateZ = z
    }

    getTransformedMatrix() {
        // TODO : SCALE
        this.transformationMatrix = multiplyMatrix(this.transformationMatrix, getRotationZMatrix(this.curAngleZ))
        this.transformationMatrix = multiplyMatrix(this.transformationMatrix, getRotationYMatrix(this.curAngleY))
        this.transformationMatrix = multiplyMatrix(this.transformationMatrix, getRotationXMatrix(this.curAngleX))
        this.transformationMatrix = multiplyMatrix(this.transformationMatrix, getTranslationMatrix(this.translateX + this.baseTranslateX, this.translateY + this.baseTranslateY, this.translateZ + this.baseTranslateZ))
    }
    getTransformedVertices() {
        let vertices = []
        this.reset()
        this.getTransformedMatrix()
        for (let i = 0; i < this.vertices.length; i += 12) {
            for (let j = 0; j < 12; j += 3) {
                let newVertex = [[this.vertices[i + j]], [this.vertices[i + j + 1]], [this.vertices[i + j + 2]], [1]]
                let retMat = multiplyMatrix(this.transformationMatrix, newVertex)

                vertices.push(retMat[0][0], retMat[1][0], retMat[2][0])
            }
        }
        return vertices
    }
    getTransformedNormal() {
        let normal = []
        let invTransposeMat = transpose(inverse(this.transformationMatrix))
        // console.log(this.transformationMatrix)
        // console.log(invTransposeMat)
        for (let i = 0; i < this.normal.length; i += 12) {
            for (let j = 0; j < 12; j += 3) {
                let newNormal = [[this.normal[i + j]], [this.normal[i + j + 1]], [this.normal[i + j + 2]], [0]]
                let retMat = multiplyMatrix(invTransposeMat, newNormal)

                normal.push(retMat[0][0], retMat[1][0], retMat[2][0])
            }
        }
        // console.log(normal)
        return normal
    }

    setId(id) {
        this.id = id
    }

    setProjectionMatrix(mat){
        this.projection_matrix = mat;
    }

    reset() {
        this.transformationMatrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]
    }

    resetTransformation() {
        this.curAngleX = 0
        this.curAngleY = 0
        this.curAngleZ = 0
        
        this.translateX = 0
        this.translateY = 0
        this.translateZ = 0
        
        this.projection_matrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 1]]
    }
}