import imageManipulation from "../../services/image-manipulation";
import { base64ToImgBuffer } from "../test-helpers/base64-converter";
import { base64Img } from "../test-helpers/test-payload";

describe("image-manipulation util", () => {
    const testImg = base64ToImgBuffer(base64Img);

    it("Should return an image buffer when calling blur", async () => {
        const testOutput = await imageManipulation("blur", testImg as Buffer, "test");

        expect(testOutput).toEqual(expect.any(String));
    });

    it("Should return an image buffer when calling negate", async () => {
        const testOutput = await imageManipulation("negate", testImg as Buffer, "test");

        expect(testOutput).toEqual(expect.any(String));
    });

    it("Should return an image buffer when calling grayscale", async () => {
        const testOutput = await imageManipulation("grayscale", testImg as Buffer, "test");

        expect(testOutput).toEqual(expect.any(String));
    });

    it("Should return an image buffer when calling resize", async () => {
        const testOutput = await imageManipulation("resize", testImg as Buffer, "test", { percentageScale: 60 });

        expect(testOutput).toEqual(expect.any(String));
    });

    it("Should return an image buffer when calling transformation", async () => {
        const testOutput = await imageManipulation("transformation",
                                                    testImg as Buffer,
                                                    "test", {
                                                        transformationSpecs: { rotation: 40 }
                                                    });

        expect(testOutput).toEqual(expect.any(String));
    });

    it("Should throw an error when no manipulationType is passed", async () => {
        try{
            const testOutput = await imageManipulation("", testImg as Buffer, "test", { percentageScale: 60 });
        } catch (error) {
            expect(error).toEqual(expect.any(Error));
        }
    });

    it("Should throw an error when no inputSpecs is passed when resize is passed", async () => {
        try{
            const testOutput = await imageManipulation("resize", testImg as Buffer, "test");
        } catch (error) {
            expect(error).toEqual(expect.any(Error));
        }
    });
});