import mime from "mime";
import fs from "fs";
import { Response } from "express";
import { errorMessages } from "./errorMessages";

export function decodeAndStoreImg(matches: RegExpMatchArray, res: Response) {
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
        res.status(500).json({
            success: "false",
            message: errorMessages.internalServerError
        });
        throw error;
    }
}