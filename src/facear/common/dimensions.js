
export const validateDimensions = (width, height) => {

  return [width ? `${width}px` : '100%', height ? `${height}px` : '100%']

}

export const rotateInZ = (u, theta) => {

  const tR = theta * Math.PI / 180
  const Rz = [[Math.cos(tR), -Math.sin(tR), 0],
                          [Math.sin(tR), Math.cos(tR), 0],
                          [0, 0 ,1]]
  const uP = [0, 0 , 0]
  for(let i =0; i < 3; i++){
    let upI = 0
    for(let j=0; j< 3; j++){
      upI += Rz[i][j] * u[j]
    }
    uP[i] = upI
  }

  return uP
}



(rotateInZ([1, 0, 0], 90))
