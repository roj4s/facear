import React, { useState, useEffect } from 'react'
import PerspectiveCamera from '../../camera/perspectiveCamera/PerspectiveCamera'


export default function CustomScene({videoElement, children}){

  const [cameraData, setCameraData] = useState()
  const label = '[CustomScene]'

  useEffect(() => {

    const [width, height] = [videoElement.offsetWidth, videoElement.offsetHeight]

    setCameraData({
      fov: 50,
      position: [width / 2, height / 2, height],
      aspect: width / height,
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
