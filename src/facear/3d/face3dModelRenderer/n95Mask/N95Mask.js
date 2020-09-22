import React, { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader, useFrame, useThree, useUpdate, apply } from 'react-three-fiber'
import { get3dObjectSize, getTriangleMesh } from '../../common/common'
import { FaceNormalsHelper } from 'three/examples/jsm/helpers/FaceNormalsHelper'

import Asset from './scene_1.gltf'


export default function N95Mask({landMarksProvider, onLoaded}){

  let obj = useLoader(GLTFLoader, '/scene.gltf')

  const [visible, setVisible] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const [modelSize, setModelSize] = useState()
  const [triangleMesh, setTriangleMesh] = useState(getTriangleMesh())
  const [baLine, setBALine] = useState()
  const [caLine, setCALine] = useState()
  const [normalLine, setNormalLine] = useState()
  const [normalsHelper, setNormalsHelper] = useState()
  const [didScaled, setDidScaled] = useState(false)

  const label = '[N95Mask]'
  const { scene } = useThree()

  useEffect(() => {

    const objSize = get3dObjectSize(obj.scene)
    setModelSize(objSize)
    obj.scene.translateZ(1111200)

    }, [obj])


  useFrame(() => {

    if(landMarksProvider){

      landMarksProvider.getLandmarks().then(landmarks => {

        if(landmarks && landmarks.length){

          if(!loaded){
            if(onLoaded !== undefined && onLoaded !== null){
              onLoaded()
            }
            setLoaded(true)
          }

            const v1 = new THREE.Vector3(landmarks[234][0], landmarks[234][1], landmarks[234][2])
            const v2 = new THREE.Vector3(landmarks[195][0], landmarks[195][1], landmarks[195][2])
            const v3 = new THREE.Vector3(landmarks[454][0], landmarks[454][1], landmarks[454][2])

            const p1 = new THREE.Vector3(landmarks[454][0], landmarks[454][1], landmarks[454][2])
            const p2 = new THREE.Vector3(landmarks[234][0], landmarks[234][1], landmarks[234][2])


            const tpC = new THREE.Vector3(landmarks[283][0], landmarks[283][1], landmarks[283][2])
            const tpB = new THREE.Vector3(landmarks[152][0], landmarks[152][1], landmarks[152][2])
            const tpA = new THREE.Vector3(landmarks[53][0], landmarks[53][1], landmarks[53][2])


            const tx = tpA.x + tpB.x + tpC.x
            const ty = tpA.y + tpB.y + tpC.y
            const tz = tpA.z + tpB.z + tpC.z


            const x = v1.x + v3.x
            const y = v1.y + v3.y
            const z = v1.z + v3.z


            const scale = p1.distanceTo(p2) / modelSize.x
            console.log(`Scale is ${scale}`)
            console.log('Model Size:', modelSize)
            console.log('P1->P2', p1.distanceTo(p2))


            obj.scene.scale.set(scale * 1.5, scale, scale * 3)


            const newTriangleMesh = getTriangleMesh([tpC, tpA, tpB])
            newTriangleMesh.geometry.computeFaceNormals()
            console.log(newTriangleMesh.geometry.faces[0].normal.clone())
            setNormalsHelper(new FaceNormalsHelper(newTriangleMesh, 100, 0xffff00, 10))
            setTriangleMesh(newTriangleMesh)

            const normal = newTriangleMesh.geometry.faces[0].normal.clone()
            normal.multiplyScalar(modelSize.z * -100)
            const lookAtFacePoint = new THREE.Vector3(landmarks[195][0], landmarks[195][1], landmarks[195][2])
            normal.add(lookAtFacePoint)
            //console.log(`Normal`, normal)
            const newNormalLine = new THREE.BufferGeometry().setFromPoints([tpA, normal])
            setNormalLine(newNormalLine)

            const dBA = tpB.clone()
            dBA.sub(tpA)

            const dCA = tpC.clone()
            dCA.sub(tpA)

            const normalVectorPoint = dBA.clone()
            normalVectorPoint.cross(dCA)
            normalVectorPoint.z = -1 * normalVectorPoint.z
            //normalVectorPoint.sub(tpA)
            normalVectorPoint.sub(lookAtFacePoint)

            obj.scene.lookAt(normal)
            //obj.scene.lookAt(normal)
            const sCA = tpC.clone()
            sCA.sub(tpA)
            const angleSCA = sCA.angleTo(new THREE.Vector3(tpC.x, 0, tpC.z)) + Math.PI
            obj.scene.rotation.z = tpC.y < tpA.y ? angleSCA * -1 : angleSCA


            const meL = landmarks[197]
            const middleEyePoint = new THREE.Vector3(meL[0], meL[1], meL[2])
            const normalForPos = newTriangleMesh.geometry.faces[0].normal.clone()
            normalForPos.multiplyScalar(modelSize.z * -12)
            middleEyePoint.sub(normalForPos)

            obj.scene.position.set(middleEyePoint.x, middleEyePoint.y, middleEyePoint.z);


            const newBALine = new THREE.BufferGeometry().setFromPoints([tpA, tpB])
            setBALine(newBALine)

            const newCALine = new THREE.BufferGeometry().setFromPoints([tpC, tpA])
            setCALine(newCALine)


            /*
            console.log(newTriangle.matrixWorld)
            normal.transformDirection(newTriangle.matrixWorld == newTriangle.matrix)
            console.log(normal)
            obj.scene.lookAt(normal)
            obj.scene.matrixWorldNeedsUpdate = true
            */

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


  return <>
    <primitive name={"TriangleMesh"} object={triangleMesh} />
    {normalsHelper &&  <primitive object={normalsHelper}/>}

  {true && <primitive name={"GlassesLoadedObj"} object={obj.scene} />}
  { baLine && <line geometry={baLine}>
            <lineBasicMaterial attach="material" color={0xff0000}/>
          </line> }

      { caLine && <line geometry={caLine}>
            <lineBasicMaterial attach="material" color={0x00ff00}/>
          </line>}
      { normalLine && <line geometry={normalLine}>
            <lineBasicMaterial attach="material" color={0x0000ff}/>
          </line>}
        </>

}

