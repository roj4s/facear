import React, { useState, useEffect } from 'react'
import * as THREE from 'three'
import { OBJLoader } from '../../loader/OBJLoader'
import { useLoader  } from 'react-three-fiber'

import MeshAsset from './facemesh.obj'

export default function FaceMesh({facePoints, color}){

  const [geometry, setGeometry] = useState()
  let obj = useLoader(OBJLoader, MeshAsset)

  useEffect(() => {

    obj.traverse(child => {
      if (child instanceof THREE.Mesh) {

        if(facePoints && facePoints.length){

          for(let i = 0; i < facePoints.length; i++){

            let [x, y, z] = facePoints[i]
            child.geometry.vertices[i].set([-x, -y, -z / 30])

          }
        }

        setGeometry(child.geometry)
        console.log("geometry set")

      }
    })

  },[facePoints, obj])


  return <>{
    geometry && <mesh
          geometry={geometry}
        >
          <meshBasicMaterial
            attach="material"
            side={THREE.FrontSide}
            wireframe={true}
            color={color | "blue"}
          />
    </mesh>
  }</>

}

