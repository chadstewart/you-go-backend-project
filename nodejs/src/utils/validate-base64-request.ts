export default function validateRequestIsBase64Format (base64String: string) {
    if (base64String === '' || base64String.trim() === '') return false;
    
    const base64StructureRegex = (/^data:([A-Za-z-+/]+);base64,(.+)$/);
    const isBase64StructuredString = base64StructureRegex.test(base64String);

    if(isBase64StructuredString) {
        const foundMatches = base64String.match(base64StructureRegex);
        if(foundMatches) {
            const isNotFormattedCorrectly = foundMatches.length !== 3;
            if(isNotFormattedCorrectly) return false;
            return foundMatches;
        }
    }

    return false;
}