class Shape {
    static ID = 0

    constructor(vertices,color,webGLShape){
        this.id = Shape.ID++
        this.webGLShape = webGLShape
        this.vertices = vertices
        this.color = color
    }

    materialize(){
        for(let i=0;i<this.vertices.length;i+=12){
            let verticesToDraw = []
            for(let j=0;j<12;j+=3){
                verticesToDraw.push(this.vertices[i+j],this.vertices[i+j+1],this.vertices[i+j+2],this.color[0],this.color[1],this.color[2])
            }
            gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(verticesToDraw),gl.STATIC_DRAW)
            gl.drawArrays(this.webGLShape,0,4)
        }
    }

}