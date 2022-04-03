import path from "path";
import sharp from "sharp";
import { Request, Response } from "express";
import { errorMessages } from "../../utils/error-utils";
import { prepareBase64ImageData } from "../../utils/prepare-base64-image-data";
import { decodeAndStoreImg, encodeToBase64 } from "../../utils/base64-utils";

export function imageTransformation (req: Request, res: Response) {
    try {
        const isThereABase64StringVariable = "base64String" in req.body;
        if(!isThereABase64StringVariable) return res.status(400).json({
            success: "false",
            message: errorMessages.base64StringVariableNotFound
        });

        const isThereATransformationSpecsVariable = "transformationSpecs" in req.body;
        if(!isThereATransformationSpecsVariable) return res.status(400).json({
            success: "false",
            message: errorMessages.transformationSpecsNotFound
        });

        const { transformationSpecs } = req.body;

        const transformationSpecsError = validateTransoformationSpecs(transformationSpecs);
        if(transformationSpecsError) return res.status(400).json({
            success: "false",
            message: transformationSpecsError
        });

        const { base64String } = req.body;

        const matchesOrError = prepareBase64ImageData(base64String);
        const statusCode = matchesOrError === errorMessages.notAnCompatibleImgType ? 415 : 400;
        
        const isMatchesAnError = !Array.isArray(matchesOrError);
        if(isMatchesAnError) return res.status(statusCode).json({
            success: "false",
            message: matchesOrError
        });
        
        const inputLocation = decodeAndStoreImg(matchesOrError);
        
        const filesLocation = {
            inputLocation,
            sendFileLocation: path.join(__dirname, `../../../`, `images/output-${Date.now()}.jpg`)
        };

        imageManipulation(
            filesLocation.inputLocation,
            filesLocation.sendFileLocation,
            transformationSpecs,
            res
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: "false",
            message: errorMessages.internalServerError
        });
    }
};

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys]

interface transformationSpecs {
    resizeScale?: number;
    rotation?: number;
    xAxisFlip?: boolean;
    yAxisFlip?: boolean;
};

type atLeastOneTransformSpec = RequireAtLeastOne<transformationSpecs>;

async function imageManipulation (
        inputLocation: string,
        outputLocation: string,
        transformationSpecs: atLeastOneTransformSpec,
        res: Response
    ) {
    try{
        let imgToTransform = sharp(inputLocation);

        const isResizeScaleInTransformationSpecs = "resizeScale" in transformationSpecs;
        if(isResizeScaleInTransformationSpecs && transformationSpecs.resizeScale) {
            const imgWidth = await sharp(inputLocation).metadata()
            .then(metadata => {
                if(metadata.width) return metadata.width;
                return 0;
            });
    
            const percentScale = transformationSpecs.resizeScale;
            const newWidth = Math.round(imgWidth * (percentScale / 100));

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

        imgToTransform.toFile(outputLocation, () => {
            const responseMessage = encodeToBase64(outputLocation);
            console.log("The image was successfully transformed!");

            return res.status(200).json({
                success: true,
                message: responseMessage
            });
        });
    } catch (error) {
        throw error;
    }
};

export function validateTransoformationSpecs (transformationSpecs: atLeastOneTransformSpec) {
    const isTranformationSpecsAnObject = typeof transformationSpecs === "object";
    if(!isTranformationSpecsAnObject) return errorMessages.transformationSpecsIsNotAnObject;

    const isAtLeastOneVarialbeInTransformationSpecs =
        "resizeScale" in transformationSpecs ||
        "rotation" in transformationSpecs ||
        "xAxisFlip" in transformationSpecs ||
        "yAxisFlip" in transformationSpecs;
    if(!isAtLeastOneVarialbeInTransformationSpecs) return errorMessages.transformationSpecsHasNoValidVariable;

    const isResizeScaleInTransformationSpecs = "resizeScale" in transformationSpecs;
    if(isResizeScaleInTransformationSpecs && typeof transformationSpecs.resizeScale === "number") {
        const isResizeScaleTheRightScale = transformationSpecs.resizeScale >= 1 && transformationSpecs.resizeScale <= 99;
        if(!isResizeScaleTheRightScale) return errorMessages.resizeScaleNotBetween1And99;
        
        const isResizeScaleANumber = typeof transformationSpecs.resizeScale === "number";
        if(!isResizeScaleANumber) return errorMessages.resizeScaleNotNumber;
    };

    const isRotationInTransformationSpecs = "rotation" in transformationSpecs;
    if(isRotationInTransformationSpecs && typeof transformationSpecs.rotation === "number") {
        const isResizeScaleTheRightScale = transformationSpecs.rotation >= 1 && transformationSpecs.rotation <= 359;
        if(!isResizeScaleTheRightScale) return errorMessages.rotationNotBetween1And359;

        const isRotationANumber = typeof transformationSpecs.rotation === "number";
        if(!isRotationANumber) return errorMessages.rotationNotNumber;
    };

    const isXAxisFlipInTransformationSpecs = "xAxisFlip" in transformationSpecs;
    if(isXAxisFlipInTransformationSpecs) {
        const isXAxisFlipABoolean = typeof transformationSpecs.xAxisFlip === "boolean";
        if(!isXAxisFlipABoolean) return errorMessages.xAxisFlipNotBoolean;
    };

    const isYAxisFlipInTransformationSpecs = "yAxisFlip" in transformationSpecs;
    if(isYAxisFlipInTransformationSpecs) {
        const isYAxisFlipABoolean = typeof transformationSpecs.yAxisFlip === "boolean";
        if(!isYAxisFlipABoolean) return errorMessages.yAxisFlipNotBoolean;
    };

    return null;
};