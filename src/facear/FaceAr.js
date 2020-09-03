import React, { Suspense } from 'react'
import WebcamViewer from './WebcamViewer/WebcamViewer'
import { validateDimensions } from './common/dimensions'
import { Canvas } from 'react-three-fiber'
import FaceMesh from './3d/face3dModelRenderer/faceMesh/FaceMesh'

import './FaceAr.css'

const onWebcamReady = () => {
  console.log('web cam ready')
}


export default function FaceAr({width, height}){

  [width, height] = validateDimensions(width, height)

  return <div
            className="FaceAr"
            style={{width: width, height: height}}
          >
            <div>
              <WebcamViewer onVideoReady={onWebcamReady}/>
            </div>
            <div style={{zIndex: 100}}>
              <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={<></>}>
                  <FaceMesh />
                </Suspense>
              </Canvas>
            </div>
          </div>

}
