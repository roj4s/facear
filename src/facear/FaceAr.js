import React, { useState, Suspense, useRef, useEffect } from 'react'
import WebcamViewer from './WebcamViewer/WebcamViewer'
import { validateDimensions } from './common/dimensions'
import GoogleFaceMeshEstimator from './landmarkProvider/GoogleFaceMeshEstimator'
import { Canvas } from 'react-three-fiber'
import FaceMesh from './3d/face3dModelRenderer/faceMesh/FaceMesh'
import CustomScene from './3d/scene/CustomScene/CustomScene'
import LoadingOverlay from './common/loadingOverlay/loadingOverlay'

import './FaceAr.css'

const loadingMsgs = {
    WEBCAM: 'Loading webcam ...',
    THREED_MODEL: 'Loading 3d model ...',
    LANDMARK_PROVIDER: 'Loading AI model ...'
  }

export default function FaceAr({width, height}){

  [width, height] = validateDimensions(width, height)
  const [landMarksProvider, setLandmarksProvider] = useState()
  const [videoElement, setVideoElement] = useState()
  const [bodyWidth, setBodyWidth] = useState(0)
  const [bodyLeft, setBodyLeft] = useState(0)
  const [messages, setMessages] = useState([])
  const rootRef = useRef()
  const label = '[FaceAr]'

  useEffect(() => {

    setMessages([loadingMsgs['WEBCAM']])

  }, [])

  const onLandmarksProviderLoaded = (e) => {
    if(e !== undefined && e !== null){
      console.log(`${label} Got error loading landmark provider`, e)
    }
    else{
      console.log(`${label} Landmarks provider loaded successfully`)
    }

    setMessages(msgs => msgs.filter(m => m !== loadingMsgs['LANDMARK_PROVIDER'] && m !== loadingMsgs['WEBCAM']))

  }

  const on3dModelLoaded = () => {

    console.log(`${label} 3d model loaded ...`)
    setMessages(msgs => msgs.filter(m => m !== loadingMsgs['THREED_MODEL'] && m !== loadingMsgs['WEBCAM']))

  }


  const onWebcamReady = (evt) => {

    console.log(`${label} Webcam ready`)
    const ve = evt.target

    setMessages([loadingMsgs['THREED_MODEL'], loadingMsgs['LANDMARK_PROVIDER']])

    const realVideoAspect =  ve.videoWidth / ve.videoHeight
    const newVideoHeight = parseInt(height)
    const newVideoWidth = newVideoHeight * realVideoAspect
    setBodyWidth(newVideoWidth)
    const newBodyLeft = -1 * newVideoWidth * .5 + parseInt(width) * .5
    setBodyLeft(newBodyLeft)


    const [widthRatio, heightRatio] = [newVideoWidth / ve.videoWidth,  newVideoHeight / ve.videoHeight]

    const scaler = (p) => {
      return [p[0] * widthRatio,  p[1] * heightRatio,  p[2]/10000]
    }

    setLandmarksProvider(new GoogleFaceMeshEstimator(ve, scaler, onLandmarksProviderLoaded))
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
        { messages && messages.length && <LoadingOverlay
                            messages={messages}/> }
        <div className={'FaceArVideoContainer'}>
          <WebcamViewer id={videoId} onVideoReady={onWebcamReady}/>
        </div>
        <div className={"CanvasContainer"}>
          <Canvas>
          {
            videoElement && <CustomScene videoElement={videoElement} >
              <Suspense fallback={<></>}>
                <FaceMesh
                    onLoaded={on3dModelLoaded}
                    landMarksProvider={landMarksProvider} />
              </Suspense>
            </CustomScene>
          }
          </Canvas>
        </div>
    </div>
    </div>

}
