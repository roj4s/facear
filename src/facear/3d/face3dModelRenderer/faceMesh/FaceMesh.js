import React, { useState, useEffect } from 'react'
import * as THREE from 'three'
import { OBJLoader } from '../../loader/OBJLoader'
import { useLoader, useFrame } from 'react-three-fiber'

import MeshAsset from './facemesh.obj'

export default function FaceMesh({landMarksProvider}){

  let obj = useLoader(OBJLoader, MeshAsset)
  const [geometry, setGeometry] = useState()
  const [visible, setVisible] = useState(false)
  const label = '[FaceMesh]'

  useEffect(() => {


      console.log(obj)
      obj.traverse(child => {
        if (child instanceof THREE.Mesh) {

          setGeometry(child.geometry)

        }
      })

    }, [obj])


  useFrame(() => {

    if(landMarksProvider && geometry){

      landMarksProvider.getLandmarks().then(landmarks => {

        if(landmarks && landmarks.length){

          const newGeometry = geometry.clone()

          for (let i = 0; i < landmarks.length; i++) {
            const [x, y, z] = landmarks[i]
            newGeometry.vertices[i].set(x, y, z)
          }

          setGeometry(newGeometry)
          setVisible(true)
        }
        else{
          setVisible(false)
        }
      }).catch(e=>{

        console.log(`${label} Couldn't get landmarks: `, e)

      })
    }

  })


  return <>{
    geometry && visible && <mesh
              geometry={geometry}
            >
            <meshBasicMaterial
                attach="material"
                side={THREE.FrontSide}
                wireframe={true}
                color={"cyan"}
            />
    </mesh>
  }</>

}

