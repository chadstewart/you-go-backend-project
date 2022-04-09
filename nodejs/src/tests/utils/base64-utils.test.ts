import { extractInfoFromBase64String, decodeImg } from "../../utils/base64-utils";
import { base64StructureRegex } from "../../utils/validation-utils";
import { resizeRequestPayload } from "../test-helpers/test-payload";
import fs from "fs";

describe("extractInfoFromBase64String", () => {
    it("It should return an array with more than 1 element when a properly formatted base64 string is passed", () => {
        if(!resizeRequestPayload.base64String) return;
        const testString = resizeRequestPayload.base64String;

        expect(extractInfoFromBase64String(testString).length).toBeGreaterThan(1);
    });

    it("It should return an Array with only 1 element when a invalid string is passed", () => {
        const testString = "test";

        expect(extractInfoFromBase64String(testString).length).toBe(1);
    });
});

describe("decodeAndStoreImg", () => {
    it("It should return an image buffer", () => {
        const matches = resizeRequestPayload.base64String?.match(base64StructureRegex);

        if(!matches) return;
        const testBuffer = decodeImg(matches);
        expect(testBuffer).toEqual(expect.any(Buffer));
    });
});