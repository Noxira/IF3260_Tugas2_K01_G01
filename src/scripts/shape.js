class Shape {
    static ID = 0

    constructor(vertices,normal,color,webGLShape){
        this.id = Shape.ID++
        this.webGLShape = webGLShape
        this.vertices = vertices
        this.normal = normal;
        this.color = color
        this.transformationMatrix = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]
        this.curAngleX = 0
        this.curAngleY = 0
        this.curAngleZ = 0
    }

    materialize(){
        let vertices = this.vertices
        let normal = this.getTransformedNormal()
        console.log(vertices)
        gl.uniformMatrix4fv(modelMatrixLocation, false, flatten(this.transformationMatrix));
        for(let i=0;i<vertices.length;i+=12){
            let verticesToDraw = []
            // if(Math.floor(i/12)%4==0){
            //     for(let j=0;j<12;j+=3){
            //         verticesToDraw.push(vertices[i+j],vertices[i+j+1],vertices[i+j+2],1,0,0,0,0,1);
            //     }
            // }else if(Math.floor(i/12)%4==1){
            //     for(let j=0;j<12;j+=3){
            //         verticesToDraw.push(vertices[i+j],vertices[i+j+1],vertices[i+j+2],0,1,0,0,0,1);
            //     }
            // }else if(Math.floor(i/12)%4==2){
            //     for(let j=0;j<12;j+=3){
            //         verticesToDraw.push(vertices[i+j],vertices[i+j+1],vertices[i+j+2],0,0,1,0,0,1);
            //     }
            // }else if(Math.floor(i/12)%4==3){
            //     for(let j=0;j<12;j+=3){
            //         verticesToDraw.push(vertices[i+j],vertices[i+j+1],vertices[i+j+2],1,0,1,0,0,1);
            //     }
            // }
            for(let j=0;j<12;j+=3){
                verticesToDraw.push(vertices[i+j],vertices[i+j+1],vertices[i+j+2],this.color[0],this.color[1],this.color[2],normal[i+j],normal[i+j+1],normal[i+j+2]);
                console.log(normal[i+j],normal[i+j+1],normal[i+j+2])
            }
            gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(verticesToDraw),gl.STATIC_DRAW)
            gl.drawArrays(this.webGLShape,0,4)
        }
    }

    rotateX(x){
        // Translate to -center
        let center = getCenterPoint(this.getTransformedVertices())
        this.transformationMatrix = multiplyMatrix(getTranslationMatrix(-center[0],-center[1],-center[2]),this.transformationMatrix)

        console.log(this.curAngleX,this.curAngleY,this.curAngleZ)
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
        console.log(this.curAngleX,this.curAngleY,this.curAngleZ)
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
        console.log(this.curAngleX,this.curAngleY,this.curAngleZ)
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
    getTransformedNormal(){
        let normal = []
        for(let i=0;i<this.normal.length;i+=12){
            for(let j=0;j<12;j+=3){
                let newNormal = [[this.normal[i+j]],[this.normal[i+j+1]],[this.normal[i+j+2]],[0]]
                let retMat = multiplyMatrix(this.transformationMatrix,newNormal)

                normal.push(retMat[0][0],retMat[1][0],retMat[2][0])
            }
        }
        return normal
    }

    setId(id){
        this.id = id
    }
}