import React, { useState, useEffect } from 'react'
import PerspectiveCamera from '../../camera/perspectiveCamera/PerspectiveCamera'


export default function CustomScene({videoElement, children}){

  const [cameraData, setCameraData] = useState()
  const label = '[CustomScene]'

  useEffect(() => {

    const veWidth = videoElement.offsetWidth
    const veHeight = videoElement.offsetHeight
    console.log(`${label} ${videoElement.videoWidth} ${videoElement.videoHeight}`)
    console.log(`${label} Width: ${veWidth}, Height: ${veHeight}`)
    setCameraData({
      fov: 50,
      position: [veWidth / 2, veHeight / 2, veHeight],
      aspect: veWidth / veHeight,
      near: 1,
      far: 5000,
    })

  }, [videoElement])


  return <>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />

    {children}

    { cameraData &&
        <PerspectiveCamera
            {...cameraData}
        />}


    </>

}
