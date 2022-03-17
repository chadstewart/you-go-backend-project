import mime from "mime";
import fs from "fs";

export function extractInfoFromBase64String (base64String: string) {
    const base64StructureRegex = (/^data:([A-Za-z-+/]+);base64,(.+)$/);
    const foundMatches = base64String.match(base64StructureRegex);
    if(foundMatches) return foundMatches;
    return ['', '', ''];
};

export function decodeAndStoreImg(matches: RegExpMatchArray) {
    const response = {
        type: matches[1],
        data: Buffer.from(matches[2], "base64")
    }

    const decodedImg = response;
    const imageBuffer = decodedImg.data;
    const type = decodedImg.type;
    const extension = mime.extension(type);
    const fileName = `image-${Date.now()}.${extension}`;
    const fileLocation = `images/${fileName}`;
    
    try {
        fs.writeFileSync(fileLocation, imageBuffer, "utf8");
        console.log("The image was successfully uploaded!" );
        return fileLocation;
    } catch (error) {
        throw error;
    }
}

export function encodeToBase64 (imageURL: string) {
    return "data:image/jpeg;base64," + fs.readFileSync(imageURL, "base64");
};