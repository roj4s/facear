import React from 'react'
import WebcamViewer from './WebcamViewer/WebcamViewer'
import { validateDimensions } from './common/dimensions'

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
            <WebcamViewer onVideoReady={onWebcamReady}/>
          </div>

}
