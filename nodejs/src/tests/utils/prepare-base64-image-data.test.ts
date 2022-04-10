import { prepareBase64ImageData } from "../../utils/prepare-base64-image-data";
import { base64Img } from "../test-helpers/test-payload";
import { errorMessages } from "../../utils/error-utils";

describe("prepareBase64ImageData utility function", () => {

    it("Should not be a string when given a properly formatted base64 image string", () => {
        const testOutput = prepareBase64ImageData(base64Img);

        expect(testOutput).not.toBe(expect.any(String));
    });

    it("Should return a error message when given an improperly formatted base64 image string", () => {
        const testInput = "dat:image/jpeg;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
        const testOutput = prepareBase64ImageData(testInput);

        expect(testOutput).toBe(errorMessages.notBase64Structured);
    });

    it("Should return a error message when given an image is not a supported image type", () => {
        const testInput = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
        const testOutput = prepareBase64ImageData(testInput);

        expect(testOutput).toBe(errorMessages.notAnCompatibleImgType);
    });

});