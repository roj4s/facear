import React, { useState, useRef, useEffect } from 'react'
import { validateDimensions } from '../common/dimensions'

import './WebcamViewer.css'

const getCameraVideo = () => {

    console.log("Loading camera video ...")
    try{
      if(navigator.mediaDevices.getUserMedia){
          return navigator.mediaDevices.getUserMedia({video: true})
      }
    }catch(e){
      console.log(e)
    }
    return null
}

export default function WebcamViewer({onVideoReady, hidden, id, width, height}){

    [width, height] = validateDimensions(width, height)

    const [deviceCompatible, setDeviceCompatible] = useState(true)

    const videoRef = useRef(null)

    useEffect(()=>{

        const cameraStream = getCameraVideo()
        if(!cameraStream){
            setDeviceCompatible(false)
        } else {
            cameraStream.then(stream => {
                if(stream && videoRef && videoRef.current)
                videoRef.current.srcObject = stream
            }).catch(err => {
                console.log("Error getting camera stream")
                console.error(err)
            });
        }
    }, [])

    return (<div className="WebcamViewer"
                 style={{
                    display: hidden ? 'none': 'initial',
                    width: width,
                    height: height
                                }}>
                { deviceCompatible ?

                        <video
                            id={id}
                            style={{
                                  display: hidden ? 'none': 'initial',
                                  width: width,
                                  height: height
                                }}
                            playsInline
                            autoPlay
                            onLoadedData={onVideoReady}
                            ref={videoRef}
                        >
                        </video>
                    : <p>Device is not compatible</p>
                }
            </div>)

}
