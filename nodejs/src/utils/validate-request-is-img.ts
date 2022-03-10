import validImageTypes from "./valid-img-types";

export default function validateRequestIsImg (dataType: string) {
    for(const [key, value] of Object.entries(validImageTypes)) {
        const isValidDataType = dataType === key;
        if(isValidDataType) return true;
    }

    return false;
}