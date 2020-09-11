import * as faceAIModelLoader from '@tensorflow-models/facemesh'
import * as tfjs_backend_webgl from "@tensorflow/tfjs-backend-webgl"

export default class GoogleFaceMeshEstimator {

  constructor(imageSource, scaler){

    let _this = this
    this.imageSource = imageSource
    this.scaler = scaler
    this.label = '[GoogleFaceMeshEstimator ]'
    faceAIModelLoader.load().then(estimator => {
      _this.estimator = estimator
      console.log(`${this.label} Estimator loaded`, estimator)
    }).catch(e => {
      console.log(`${this.label} Couldn't load estimator`, e)
    })

  }

  getLandmarks() {

    let _this = this
    if(this.estimator && this.imageSource){
      return this.estimator.estimateFaces(this.imageSource)
        .then(predictions => {
          if(predictions && predictions.length) {
            predictions = predictions[0].scaledMesh

            if(_this.scaler)
            {
              predictions = predictions.map(_this.scaler)
            }

            return predictions

          } else {
            return []
          }

        })
    }

    return Promise.resolve([])
  }

}
