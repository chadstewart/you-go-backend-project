import { validateRequestIsBase64Format, validateRequestIsImg } from "../../utils/validation-utils";
import requestPayload from "../test-helpers/test-payload";

describe("validateRequestIsImg Utility", () => {
    it("It should return true when given a corrent string containing an image type", () => {
        const testString = "image/jpeg";

        expect(validateRequestIsImg(testString)).toBeTruthy();
    });

    it("It should return false when given an incorrent string", () => {
        const testString = "test";

        expect(validateRequestIsImg(testString)).toBeFalsy();
    });

    it("It should return false when given an invalid image type", () => {
        const testString = "image/gif";

        expect(validateRequestIsImg(testString)).toBeFalsy();
    });
});

describe("validateRequestIsBase64Format Utility", () => {
    it("It should return true if given a valid properly formatted base64 string", () => {
        if(!requestPayload.base64String) return;
        const testString = requestPayload.base64String;

        expect(validateRequestIsBase64Format(testString)).toBeTruthy();
    });

    it("It should return false if given an invalid string", () => {
        const testString = "test";

        expect(validateRequestIsBase64Format(testString)).toBeFalsy();
    });

    it("It should return false if given an empty string", () => {
        const testString = "";

        expect(validateRequestIsBase64Format(testString)).toBeFalsy();
    });
});