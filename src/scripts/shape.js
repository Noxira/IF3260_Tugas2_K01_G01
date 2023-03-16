class Shape {
    static ID = 0

    constructor(vertices,color,webGLShape){
        this.id = Shape.ID++
        this.webGLShape = webGLShape
        this.vertices = vertices
        this.color = color
        this.transformationMatrix = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]
        this.curAngleX = 0
        this.curAngleY = 0
        this.curAngleZ = 0
    }

    materialize(){
        for(let i=0;i<this.vertices.length;i+=12){
            let verticesToDraw = []
            for(let j=0;j<12;j+=3){
                let newVertex = [[this.vertices[i+j]],[this.vertices[i+j+1]],[this.vertices[i+j+2]],[1]]
                let retMat = multiplyMatrix(this.transformationMatrix,newVertex)

                verticesToDraw.push(retMat[0][0],retMat[1][0],retMat[2][0],this.color[0],this.color[1],this.color[2])
            }
            gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(verticesToDraw),gl.STATIC_DRAW)
            gl.drawArrays(this.webGLShape,0,4)
        }
    }

    rotateX(x){
        // Translate to -center
        let center = getCenterPoint(this.getTransformedVertices())
        this.transformationMatrix = multiplyMatrix(getTranslationMatrix(-center[0],-center[1],-center[2]),this.transformationMatrix)

        // Rotate
        let rotationXMatrix = getRotationXMatrix(x-this.curAngleX)
        this.transformationMatrix = multiplyMatrix(rotationXMatrix,this.transformationMatrix)
        this.curAngleX = x

        // Translate 
        this.transformationMatrix = multiplyMatrix(getTranslationMatrix(center[0],center[1],center[2]),this.transformationMatrix)

    }

    rotateY(x){
        // Translate to -center
        let center = getCenterPoint(this.getTransformedVertices())
        this.transformationMatrix = multiplyMatrix(getTranslationMatrix(-center[0],-center[1],-center[2]),this.transformationMatrix)

        // Rotate
        let rotationYMatrix = getRotationYMatrix(x-this.curAngleY)
        this.transformationMatrix = multiplyMatrix(rotationYMatrix,this.transformationMatrix)
        this.curAngleY = x

        // Translate 
        this.transformationMatrix = multiplyMatrix(getTranslationMatrix(center[0],center[1],center[2]),this.transformationMatrix)
    }

    rotateZ(x){
        // Translate to -center
        let center = getCenterPoint(this.getTransformedVertices())
        this.transformationMatrix = multiplyMatrix(getTranslationMatrix(-center[0],-center[1],-center[2]),this.transformationMatrix)

        // Rotate
        let rotationZMatrix = getRotationZMatrix(x-this.curAngleZ)
        this.transformationMatrix = multiplyMatrix(rotationZMatrix,this.transformationMatrix)
        this.curAngleZ = x

        // Translate 
        this.transformationMatrix = multiplyMatrix(getTranslationMatrix(center[0],center[1],center[2]),this.transformationMatrix)
    }

    translate(x,y,z){
        translationMatrix =  getTranslationMatrix(x,y,z)
        this.transformationMatrix = multiplyMatrix(translationMatrix,this.transformationMatrix)
    }

    getTransformedVertices(){
        let vertices = []
        for(let i=0;i<this.vertices.length;i+=12){
            for(let j=0;j<12;j+=3){
                let newVertex = [[this.vertices[i+j]],[this.vertices[i+j+1]],[this.vertices[i+j+2]],[1]]
                let retMat = multiplyMatrix(this.transformationMatrix,newVertex)

                vertices.push(retMat[0][0],retMat[1][0],retMat[2][0])
            }
        }
        return vertices
    }

}