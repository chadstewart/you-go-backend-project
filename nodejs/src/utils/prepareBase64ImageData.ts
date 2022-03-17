import { errorMessages } from "./errorMessages";
import validateRequestIsBase64Format from "./validate-base64-request";
import validateRequestIsImg from "./validate-request-is-img";
import extractInfoFromBase64String from "./extra-info-from-base64-string";

export function prepareBase64ImageData(base64String: string) {
    const isNotValid = !validateRequestIsBase64Format(base64String);
    if(isNotValid) return errorMessages.notBase64Structured;

    const foundMatches = extractInfoFromBase64String(base64String);
    
    const isCompatibleImage = validateRequestIsImg(foundMatches[1]);
    if(!isCompatibleImage) return errorMessages.notAnCompatibleImgType;

    return foundMatches;
};