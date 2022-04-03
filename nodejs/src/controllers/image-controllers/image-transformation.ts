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

        const isTranformationSpecsAnObject = typeof transformationSpecs === "object";
        if(!isTranformationSpecsAnObject) return res.status(400).json({
            success: "false",
            message: errorMessages.transformationSpecsIsNotAnObject
        });

        // { "resizeScale": 40, "rotation": 60, "x-axis-flip": "true", "y-axis-flip": "true" }

        const doesTransformationSpecsHaveOneValidVariable =
            "resizeScale" in transformationSpecs ||
            "rotation" in transformationSpecs ||
            "xAxisFlip" in transformationSpecs ||
            "yAxisFlip" in transformationSpecs;

        if(!doesTransformationSpecsHaveOneValidVariable) return res.status(400).json({
            success: "false",
            message: errorMessages.transformationSpecsHasNoValidVariable
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

type atLeastOneTransSpec = RequireAtLeastOne<transformationSpecs>;

function imageManipulation (
        inputLocation: string,
        outputLocation: string,
        transformationSpecs: atLeastOneTransSpec,
        res: Response
    ) {
    try{
        //Write sharp methods here
        
    } catch (error) {
        throw error;
    }
};