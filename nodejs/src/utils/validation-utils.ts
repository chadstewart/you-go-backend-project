import validImageTypes from "./valid-img-types";

export const base64StructureRegex = (/^data:([A-Za-z-+/]+);base64,(.+)$/);

export function validateRequestIsImg (dataType: string) {
    if(!dataType) return false;
    
    for(const [key] of Object.entries(validImageTypes)) {
        const isValidDataType = dataType === key;
        if(isValidDataType) return true;
    }

    return false;
};

export function validateRequestIsBase64Format (base64String: string) {
    if (base64String === '' || base64String.trim() === '') return false;
    
    const isBase64StructuredString = base64StructureRegex.test(base64String);

    if(isBase64StructuredString) {
        const foundMatches = base64String.match(base64StructureRegex);
        if(foundMatches) return true;
    }

    return false;
};
