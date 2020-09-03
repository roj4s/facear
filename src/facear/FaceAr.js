import React, { useState, Suspense } from 'react'
import WebcamViewer from './WebcamViewer/WebcamViewer'
import { validateDimensions } from './common/dimensions'
import { Canvas } from 'react-three-fiber'
import FaceMesh from './3d/face3dModelRenderer/faceMesh/FaceMesh'
import VideoSprite from './3d/sprite/VideoSprite/VideoSprite'
import PerspectiveCamera from './3d/camera/perspectiveCamera/PerspectiveCamera'

import './FaceAr.css'




export default function FaceAr({width, height}){

  [width, height] = validateDimensions(width, height)
  const [videoElement, setVideoElement] = useState()
  const [cameraData, setCameraData] = useState()


  const onWebcamReady = () => {

    console.log('[FaceAr] Webcam ready')
    const ve = document.querySelector(`#${videoId}`)
    const veWidth = ve.offsetWidth
    const veHeight = ve.offsetHeight
    setVideoElement(ve)
    setCameraData({
        fov: 50,
        position: [-veWidth / 2, -veHeight / 2, veHeight],
        aspect: veWidth / veHeight,
        near: 1,
        far: 5000,
     //   lookAt: [-ve.videoWidth / 2, ve.videoHeight / 2, 0]
    })

  }


  // TODO: Generate a random video component id (mind collision also maybe using
  // redux)
  const videoId = 'video1'

  return <div
            className="FaceAr"
            style={{width: width, height: height}}
          >
            <div>
              <WebcamViewer id={videoId} onVideoReady={onWebcamReady}/>
            </div>
            <div>
              <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={<></>}>
                  <FaceMesh />
                </Suspense>

                { cameraData &&
                  <PerspectiveCamera
                        {...cameraData}
                      />}

                { videoElement &&
                    <VideoSprite
                      videoElement={videoElement}
                      /> }
              </Canvas>
            </div>
          </div>

}
