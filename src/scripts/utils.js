let objectPicker = document.getElementById('objectlist');
objectPicker.selectedIndex = 0;

function toRad(x){
    return x/(180/Math.PI)
}

function multiplyMatrix(m1,m2){
    ret = []
    for(let i=0;i<m1.length;i++){
        ret.push([])
        for(let j=0;j<m2[0].length;j++){
            ret[i].push(0)
            for(let k=0;k<m1[0].length;k++){
                ret[i][j] += m1[i][k] * m2[k][j]
            }
        }
    }
    return ret
}

function getRotationXMatrix(x){
    x = toRad(x)
    c = Math.cos(x)
    s = Math.sin(x)

    mat = [[1,0,0,0],[0,c,-s,0],[0,s,c,0],[0,0,0,1]]
    return mat
}

function getRotationYMatrix(x){
    x = toRad(x)
    c = Math.cos(x)
    s = Math.sin(x)

    mat = [[c,0,s,0],[0,1,0,0],[-s,0,c,0],[0,0,0,1]]
    return mat
}

function getRotationZMatrix(x){
    x = toRad(x)
    c = Math.cos(x)
    s = Math.sin(x)

    mat = [[c,-s,0,0],[s,c,0,0],[0,0,1,0],[0,0,0,1]]
    return mat
}

function getCenterPoint(vertices){
    ret = [0,0,0]
    for(let i=0;i<vertices.length;i+=3){
        for(let j=0;j<3;j++){
            ret[j] += vertices[i+j]
        }
    }
    for(let i=0;i<3;i++){
        ret[i]/=vertices.length/3
    }
    return ret
}

function getTranslationMatrix(x,y,z){
    mat = [[1,0,0,x],[0,1,0,y],[0,0,1,z],[0,0,0,1]]
    return mat
}

function updateObjectChosen(){
    choosenShapeID = objectPicker.value
    console.log(choosenShapeID);
}