import fs from "fs";

export function encodeToBase64 (imageURL: string) {
    return "data:image/jpeg;base64," + fs.readFileSync(imageURL, "base64");
};