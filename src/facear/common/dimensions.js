export const validateDimensions = (width, height) => {

  return [width ? `${width}px` : '100%', height ? `${height}px` : '100%']

}
