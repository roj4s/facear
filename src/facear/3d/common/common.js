import * as THREE from 'three'

export const get3dObjectSize = (obj) => {
  const bbox = get3dObjectBox(obj)
  return bbox.getSize(new THREE.Vector3())
}

export const get3dObjectCenter = (obj) => {

  const bbox = get3dObjectBox(obj)
  return bbox.getCenter(new THREE.Vector3())

}

export const get3dObjectBox = (obj) => {

  return new THREE.Box3().setFromObject(obj)

}

export const getTriangleGeometry = (vertices) => {

    if(vertices === undefined || vertices === null){
      vertices = [
          new THREE.Vector3(100, 0, 0),
          new THREE.Vector3(-100, 0, 0),
          new THREE.Vector3(0, 0, -100),
      ]
    }

    const triangle = new THREE.Geometry();
    vertices.forEach(v => triangle.vertices.push(v))

    triangle.faces.push(new THREE.Face3(0, 1, 2))
    return triangle

}

export const getTriangleMesh = (vertices) => {

  const geo = getTriangleGeometry(vertices)
  const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, wireframe:true}))
  mesh.matrixWorldNeedsUpdate = true
  return mesh

}
