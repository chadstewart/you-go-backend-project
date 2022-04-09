import { base64StructureRegex } from "./validation-utils";
import fs from "fs";

export function extractInfoFromBase64String (base64String: string) {
    const foundMatches = base64String.match(base64StructureRegex);
    if(foundMatches) return foundMatches;
    return [""];
};

export function decodeImg(matches: RegExpMatchArray) {
    const response = {
        type: matches[1],
        data: Buffer.from(matches[2], "base64")
    }

    const decodedImg = response;
    const imageBuffer = decodedImg.data;
    return imageBuffer;
}

export function encodeToBase64 (imageBuffer: Buffer) {
    return "data:image/jpeg;base64," + imageBuffer.toString("base64");
};