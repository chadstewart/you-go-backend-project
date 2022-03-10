import mime from "mime";
import fs from "fs";
import { Response } from "express";

export function decodeAndStoreImg(matches: RegExpMatchArray, res: Response) {
    const response = {
        type: matches[1],
        data: Buffer.from(matches[2], "base64")
    }

    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = mime.extension(type);
    let fileName = `image-${Date.now()}.${extension}`;
    try {
        fs.writeFileSync(`images/${fileName}`, imageBuffer, "utf8");
        return res.send({ status: "The image was successfully uploaded!" });
    } catch (error) {
        throw (error);
    }
}