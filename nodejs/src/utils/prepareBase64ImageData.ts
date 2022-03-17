import { errorMessages } from "./errorMessages";
import validateRequestIsBase64Format from "./validate-base64-request";
import validateRequestIsImg from "./validate-request-is-img";

export function prepareBase64ImageData(base64String: string) {
    const foundMatches = validateRequestIsBase64Format(base64String);
    if(!foundMatches) return errorMessages.notBase64Structured;
    
    const isCompatibleImage = validateRequestIsImg(foundMatches[1]);
    if(!isCompatibleImage) return errorMessages.notAnCompatibleImgType;

    return foundMatches;
}