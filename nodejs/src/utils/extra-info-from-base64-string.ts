export default function extractInfoFromBase64String (base64String: string) {
    const base64StructureRegex = (/^data:([A-Za-z-+/]+);base64,(.+)$/);
    const foundMatches = base64String.match(base64StructureRegex);
    if(foundMatches) return foundMatches;
    return ['', '', ''];
};