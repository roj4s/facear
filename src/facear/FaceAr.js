import React, { useState, Suspense, useRef } from 'react'
import WebcamViewer from './WebcamViewer/WebcamViewer'
import { validateDimensions } from './common/dimensions'
import GoogleFaceMeshEstimator from './landmarkProvider/GoogleFaceMeshEstimator'
import { Canvas } from 'react-three-fiber'
import FaceMesh from './3d/face3dModelRenderer/faceMesh/FaceMesh'
import CustomScene from './3d/scene/CustomScene/CustomScene'

import './FaceAr.css'


export default function FaceAr({width, height}){

  [width, height] = validateDimensions(width, height)
  const [landMarksProvider, setLandmarksProvider] = useState()
  const [videoElement, setVideoElement] = useState()
  const rootRef = useRef()
  const label = '[FaceAr]'


  const onWebcamReady = () => {

    console.log(`${label} Webcam ready`)
    const ve = document.querySelector(`#${videoId}`)
    const ref = rootRef.current
    const [widthRatio, heightRatio] = [ref.offsetWidth / ve.videoWidth, ref.offsetHeight / ve.videoHeight]

    const scaler = (p) => {
      return [p[0] * widthRatio,  p[1] * heightRatio,  p[2] / 100]
    }

    setLandmarksProvider(new GoogleFaceMeshEstimator(ve, scaler))
    setVideoElement(ve)

  }


  // TODO: Generate a random video component id (mind collision also maybe using
  // redux)
  const videoId = 'video1'

  return <div
      className="FaceAr"
      ref={rootRef}
      style={{width: width, height: height}}
    >
    <div>
      <WebcamViewer id={videoId} onVideoReady={onWebcamReady}/>
    </div>
    <div className={"CanvasContainer"}>
      <Canvas>
      {
        videoElement && <CustomScene videoElement={videoElement} >
          <Suspense fallback={<></>}>
            <FaceMesh landMarksProvider={landMarksProvider} />
          </Suspense>
        </CustomScene>
      }
      </Canvas>
    </div>
    </div>

}
