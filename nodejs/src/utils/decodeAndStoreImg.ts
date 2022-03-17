import mime from "mime";
import fs from "fs";

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