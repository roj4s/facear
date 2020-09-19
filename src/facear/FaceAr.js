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
  const [bodyWidth, setBodyWidth] = useState(0)
  const [bodyLeft, setBodyLeft] = useState(0)
  const rootRef = useRef()
  const label = '[FaceAr]'


  const onWebcamReady = (evt) => {

    console.log(`${label} Webcam ready`)
    const ve = evt.target
    const ref = rootRef.current

    const realVideoAspect =  ve.videoWidth / ve.videoHeight
    const newVideoHeight = parseInt(height)
    const newVideoWidth = newVideoHeight * realVideoAspect
    setBodyWidth(newVideoWidth)
    const newBodyLeft = -1 * newVideoWidth * .5 + parseInt(width) * .5
    console.log(`Body Left: ${newBodyLeft}`)
    setBodyLeft(newBodyLeft)

    console.log(`New Video Height: ${newVideoHeight}`)
    console.log(`New Video Width: ${newVideoWidth}`)

    const [widthRatio, heightRatio] = [newVideoWidth / ve.videoWidth,  newVideoHeight / ve.videoHeight]
    console.log(`RootWidth: ${ref.offsetWidth} RootHeight: ${ref.offsetHeight}`)
    console.log(`VideoWidth: ${ve.videoWidth} RootHeight: ${ve.videoHeight}`)
    console.log(`WidthRatio: ${widthRatio}, HeightRation: ${heightRatio}`)

    const scaler = (p) => {
      return [p[0] * widthRatio,  p[1] * heightRatio,  p[2]/10000]
    }

    setLandmarksProvider(new GoogleFaceMeshEstimator(ve, scaler))
    setVideoElement(ve)

  }


  // TODO: Generate a random video component id (mind collision also maybe using
  // redux)
  const videoId = 'video1'

  return <div
      className={"FaceAr"}
      ref={rootRef}
      style={{width: width, height: height}}
    >
    <span className={"FaceArCenterLine"}></span>
    <div className={"FaceArBody"} style={{
      width: bodyWidth,
      left: bodyLeft
    }}>
    <span className={"FaceArBodyCenterLine"}></span>
        <div className={'FaceArVideoContainer'}>
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
    </div>

}
