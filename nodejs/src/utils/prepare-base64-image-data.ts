import { errorMessages } from "./error-utils";
import { validateRequestIsBase64Format, validateRequestIsImg } from "./validation-utils";
import { extractInfoFromBase64String } from "./base64-utils";

export function prepareBase64ImageData(base64String: string) {
    const isNotValid = !validateRequestIsBase64Format(base64String);
    if(isNotValid) return errorMessages.notBase64Structured;

    const foundMatches = extractInfoFromBase64String(base64String);
    
    const isCompatibleImage = validateRequestIsImg(foundMatches[1]);
    if(!isCompatibleImage) return errorMessages.notAnCompatibleImgType;

    return foundMatches;
};