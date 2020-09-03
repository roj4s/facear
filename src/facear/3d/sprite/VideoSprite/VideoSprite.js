import React, { useEffect } from 'react'
import * as THREE from 'three'
import { useState } from 'react'

export default function VideoSprite({videoElement, width, height}) {

    const [videoTexture, setVideoTexture] = useState()
    const veData = videoElement.getBoundingClientRect()
    width = width | videoElement.offsetWidth
    height = height | videoElement.offsetHeight

    useEffect(()=>{

        const newVideoTexture = new THREE.VideoTexture(videoElement)
        newVideoTexture.wrapS = THREE.RepeatWrapping
        newVideoTexture.repeat.x = -1
        setVideoTexture(newVideoTexture)

    },[videoElement])

    return <sprite
                center={[0.5, 0.5]}
                scale={[-width, height, 1]}
                position={[-width / 2, -height / 2, -1]}
                >
        {
            videoTexture && <spriteMaterial
                attach="material"
                map={videoTexture}
                side={THREE.DoubleSide}
                depthWrite={false}
            />
        }
    </sprite>
}
