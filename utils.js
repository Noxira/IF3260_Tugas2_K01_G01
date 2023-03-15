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