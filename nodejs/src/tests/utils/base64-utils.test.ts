import { extractInfoFromBase64String } from "../../utils/base64-utils";
import requestPayload from "../test-helpers/test-payload";

describe("extractInfoFromBase64String", () => {
    it("It should return an Array with more than 1 element when a properly formatted base64 string is passed", () => {
        if(!requestPayload.base64String) return;
        const testString = requestPayload.base64String;

        expect(extractInfoFromBase64String(testString).length).toBeGreaterThan(1);
    });

    it("It should return an Array with only 1 element when a invalid string is passed", () => {
        const testString = "test";

        expect(extractInfoFromBase64String(testString).length).toBe(1);
    });
});