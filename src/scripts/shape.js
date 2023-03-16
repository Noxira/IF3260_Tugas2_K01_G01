class Shape {
    static ID = 0

    constructor(vertices,color,webGLShape){
        this.id = Shape.ID++
        this.webGLShape = webGLShape
        this.vertices = vertices
        this.color = color
        this.transformationMatrix = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]
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
        rotationXMatrix = getRotationXMatrix(x)
        this.transformationMatrix = multiplyMatrix(rotationXMatrix,this.transformationMatrix)
    }

    rotateY(x){
        rotationYMatrix = getRotationYMatrix(x)
        this.transformationMatrix = multiplyMatrix(rotationYMatrix,this.transformationMatrix)
    }

    rotateZ(x){
        rotationZMatrix = getRotationZMatrix(x)
        this.transformationMatrix = multiplyMatrix(rotationZMatrix,this.transformationMatrix)
    }

    translate(x,y,z){
        translationMatrix =  getTranslationMatrix(x,y,z)
        this.transformationMatrix = multiplyMatrix(translationMatrix,this.transformationMatrix)
    }

}