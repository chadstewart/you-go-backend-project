import fs from "fs";
import sharp from "sharp";
import { encodeToBase64 } from "../utils/base64-utils";
import logger from "../logger";
import { RequireAtLeastOne } from "../interfaces/require-at-least-one";

interface transformationSpecs {
    resizeScale?: number;
    rotation?: number;
    xAxisFlip?: boolean;
    yAxisFlip?: boolean;
};

type AtLeastOneTransformSpec = RequireAtLeastOne<transformationSpecs>;

export default function imageManipulation (
    manipulationType: string,
    imageBuffer: Buffer,
    outputLocation: string,
    inputSpecs?: {
        percentageScale?: number,
        transformationSpecs?: AtLeastOneTransformSpec
    }
) {
    // const isThereNoImageFolder = !fs.existsSync("images");
    // if(isThereNoImageFolder) fs.mkdirSync("images");
    
    const isResizeManip = manipulationType === "resize";
    const isBlurManip = manipulationType === "blur";
    const isNegateManip = manipulationType === "negate";
    const isGrayScaleManip = manipulationType === "grayscale";
    const isTransformationManip = manipulationType === "transformation";

    try {
        if(isBlurManip) return imageManipulationBlur(imageBuffer, outputLocation);
        if(isNegateManip) return imageManipulationNegate(imageBuffer, outputLocation);
        if(isGrayScaleManip) return imageManipulationGrayScale(imageBuffer, outputLocation);

        if(inputSpecs) {
            if(isResizeManip) return imageManipulationResize(imageBuffer, outputLocation, inputSpecs.percentageScale as number);
            if(isTransformationManip) return imageManipulationTransformation(imageBuffer, outputLocation, inputSpecs.transformationSpecs as AtLeastOneTransformSpec);
            throw new Error("There was no input specs defined!");
        }
        
        throw new Error("There was no image transformation type selected!");
    } catch (error) {
        throw error;
    }
}

async function imageManipulationGrayScale (
    imageBuffer: Buffer,
    outputLocation: string
) {
    try{
        const manipedImg = sharp(imageBuffer).grayscale();
        const manipedImgBuffer = await manipedImg.toBuffer();
        
        //manipedImg.toFile(outputLocation, () => console.log("The image was successfully grayscaled!"));
        logger.info("The image was successfully grayscaled!", { manipulation: "grayscaled"});

        const base64Img = encodeToBase64(manipedImgBuffer);

        return base64Img;
    } catch (error) {
        throw error;
    }
};

async function imageManipulationBlur (
    imageBuffer: Buffer,
    outputLocation: string
) {
    try{
        const manipedImg = sharp(imageBuffer).blur(1);
        const manipedImgBuffer = await manipedImg.toBuffer();
        
        //manipedImg.toFile(outputLocation, () => console.log("The image was successfully blurred!"));
        logger.info("Image was successfully blurred!", { manipulation: "blur"});
        
        const base64Img = encodeToBase64(manipedImgBuffer);

        return base64Img;
    } catch (error) {
        throw error;
    }
};

async function imageManipulationNegate (
    imageBuffer: Buffer,
    outputLocation: string
) {
    try{
        const manipedImg = sharp(imageBuffer).negate();
        const manipedImgBuffer = await manipedImg.toBuffer();
        
        //manipedImg.toFile(outputLocation, () => console.log("The image was successfully negated!"));
        logger.info("The image was successfully negated!", { manipulation: "negate"});

        const base64Img = encodeToBase64(manipedImgBuffer);

        return base64Img;
    } catch (error) {
        throw error;
    }
};

async function imageManipulationResize(
    imageBuffer: Buffer,
    outputLocation: string,
    percentageScale: number
) {
    try {
        const imgWidth = await sharp(imageBuffer).metadata()
        .then(metadata => {
            if(metadata.width) return metadata.width;
            return 0;
        });

        const newWidth = Math.round(imgWidth * (percentageScale / 100));
        
        const manipedImg = sharp(imageBuffer)
            .resize( {
                width: newWidth,
                fit: "contain"
            });

            const manipedImgBuffer = await manipedImg.toBuffer();
            
            //manipedImg.toFile(outputLocation, () => console.log("The image was successfully resized!"));
            logger.info("The image was successfully resized!", { manipulation: "resize"});

            const base64Img = encodeToBase64(manipedImgBuffer);

            return base64Img;
    } catch (error) {
        throw error;
    }
};

async function imageManipulationTransformation (
    imageBuffer: Buffer,
    outputLocation: string,
    transformationSpecs: AtLeastOneTransformSpec
) {
    try{
        console.log(JSON.stringify(transformationSpecs));
        let imgToTransform = sharp(imageBuffer);

        const isResizeScaleInTransformationSpecs = "resizeScale" in transformationSpecs;
        if(isResizeScaleInTransformationSpecs && transformationSpecs.resizeScale) {
            const imgWidth = await sharp(imageBuffer).metadata()
            .then(metadata => {
                if(metadata.width) return metadata.width;
                return 0;
            });

            const percentageScale = transformationSpecs.resizeScale;
            const newWidth = Math.round(imgWidth * (percentageScale / 100));

            imgToTransform = imgToTransform.resize( {
                width: newWidth,
                fit: "contain"
            });
        };

        const isRotationInTransformationSpecs = "rotation" in transformationSpecs;
        if(isRotationInTransformationSpecs && transformationSpecs.rotation) {
            const rotation = transformationSpecs.rotation;
            imgToTransform = imgToTransform.rotate(rotation);
        };

        const isYAxisFlipInTransformationSpecs = "yAxisFlip" in transformationSpecs;
        if(isYAxisFlipInTransformationSpecs) {
            imgToTransform = imgToTransform.flip();
        };

        const isXAxisFlipInTransformationSpecs = "xAxisFlip" in transformationSpecs;
        if(isXAxisFlipInTransformationSpecs) {
            imgToTransform = imgToTransform.flop();
        };

        const manipedImgBuffer = await imgToTransform.toBuffer();

        //imgToTransform.toFile(outputLocation, () => console.log("The image was successfully transformed!"));
        logger.info("The image was successfully transformed!", { manipulation: "transformation"});

        const base64Img = encodeToBase64(manipedImgBuffer);

        return base64Img;
    } catch (error) {
        throw error;
    }
};