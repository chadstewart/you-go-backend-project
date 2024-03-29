import { base64StructureRegex } from "./validation-utils";
import logger from "../logger";

export function extractInfoFromBase64String (base64String: string) {
    const foundMatches = base64String.match(base64StructureRegex);
    if(foundMatches) return foundMatches;
    return [""];
};

export function decodeImg(matches: string[]) {
    const response = {
        type: matches[1],
        data: Buffer.from(matches[2], "base64")
    }

    const decodedImg = response;
    const imageBuffer = decodedImg.data;

    logger.info("Image has been successfully decoded from base64");
    return imageBuffer;
}

export function encodeToBase64 (imageBuffer: Buffer) {
    const encodedImg = "data:image/jpeg;base64," + imageBuffer.toString("base64");

    logger.info("Image has been successfully encoded to base64");
    return encodedImg;
};