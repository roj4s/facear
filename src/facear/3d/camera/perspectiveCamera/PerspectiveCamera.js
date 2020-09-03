import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from 'react-three-fiber'

export default function PerspectiveCamera(props) {
    const ref = useRef()
    const { setDefaultCamera } = useThree()
    useEffect(() => void setDefaultCamera(ref.current), [setDefaultCamera])
    useFrame(() => ref.current.updateMatrixWorld())

    return <perspectiveCamera ref={ref} {...props} />
  }
