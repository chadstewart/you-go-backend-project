import { extractInfoFromBase64String, decodeAndStoreImg } from "../../utils/base64-utils";
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
    afterAll(() => {
      fs.rmSync("images", { recursive: true, force: true });
    });

    it("It should return a string and that string correspond to a file address that was recently created", async () => {
        const matches = resizeRequestPayload.base64String?.match(base64StructureRegex);

        if(!matches) return;
        const testLocation = await decodeAndStoreImg(matches);
        const isThereAFileHere = fs.existsSync(testLocation);

        expect(isThereAFileHere).toBeTruthy();
    });
});