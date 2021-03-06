export const errorMessages = {
    notAnCompatibleImgType: "Please send an image that is .jpg, .jpeg, .jpe or .png",
    notBase64Structured: "This is not a properly formatted base64 image",
    base64StringVariableNotFound: "The base64String variable was not found in the request",
    percentageVariableNotFound: "The percentageScale varialbe was not found in the request",
    percentageNotBetween1And99: "The percentage that was passed is not between 1 and 99",
    internalServerError: "There was an internal server error",
    notImplemented: "This HTTP verb is not implemented",
    transformationSpecsNotFound: "The transformationSpecs variable was not found in the request",
    transformationSpecsIsNotAnObject: "The transformationSpecs variable is not an object",
    transformationSpecsHasNoValidVariable: "The transformationSpecs object does not have at least one valid variable",
    resizeScaleNotNumber: "The resizeScale variable in transformationSpecs is not a number",
    resizeScaleNotBetween1And99: "The resizeScale variable in transformation Specs that was passed is not between 1 and 99",
    rotationNotNumber: "The rotation variable in transformationSpecs is not a number",
    rotationNotBetween1And359: "The rotation variable in transformationSpecs is not between 1 and 359",
    xAxisFlipNotBoolean: "The xAxisFlip variable in transformationSpecs is not a boolean",
    yAxisFlipNotBoolean: "The yAxisFlip variable in transformationSpecs is not a boolean"
};