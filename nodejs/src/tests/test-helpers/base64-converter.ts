const base64StructureRegex = (/^data:([A-Za-z-+/]+);base64,(.+)$/);

export function base64ToImgBuffer (base64String: string) {
    const foundMatches = base64String.match(base64StructureRegex);
    if(foundMatches) return Buffer.from(foundMatches[2], "base64");
};