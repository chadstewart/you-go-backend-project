import path from "path";
import sharp from "sharp";
import { Request, Response } from "express";
import { errorMessages } from "../../utils/error-utils";
import { prepareBase64ImageData } from "../../utils/prepare-base64-image-data";
import { decodeAndStoreImg, encodeToBase64 } from "../../utils/base64-utils";

export function imageNegate (req: Request, res: Response) {
    try {
        const isThereABase64StringVariable = "base64String" in req.body;
        if(!isThereABase64StringVariable) return res.status(400).json({
            success: "false",
            message: errorMessages.base64StringVariableNotFound
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

function imageManipulation (
        inputLocation: string,
        outputLocation: string,
        res: Response
    ) {
    try{
        sharp(inputLocation)
        .negate()
        .toFile(outputLocation, () => {
            const responseMessage = encodeToBase64(outputLocation);
            console.log("The image was successfully grayscaled!");

            return res.status(200).json({
                success: true,
                message: responseMessage
            });
        });
    } catch (error) {
        throw error;
    }
};