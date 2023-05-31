import base64Img from "./base64-img";
interface resizeTestPayloadInterface {
    percentageScale?: any;
    base64String?: any;
}

interface transformationTestPayloadInterface {
  transformationSpecs?: transformationSpecsInterface;
  base64String?: string;
}

interface transformationSpecsInterface {
  resizeScale?: any;
  rotation?: any;
  xAxisFlip?: any;
  yAxisFlip?: any;
}

const resizeRequestPayload: resizeTestPayloadInterface = {
    percentageScale: 40,
    base64String: base64Img
};

const transformationRequestPayload: transformationTestPayloadInterface = {
  transformationSpecs: {
    resizeScale: 40,
    rotation: 60,
    xAxisFlip: true,
    yAxisFlip: true
  },
  base64String: base64Img
};

export {
  base64Img,
  resizeRequestPayload,
  transformationRequestPayload
};