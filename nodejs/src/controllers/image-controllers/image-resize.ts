import path from "path";
import { Request, Response } from "express";
import { errorMessages } from "../../utils/error-utils";
import { prepareBase64ImageData } from "../../utils/prepare-base64-image-data";
import { decodeImg } from "../../utils/base64-utils";
import logger from "../../logger";
import imageManipulation from "../../services/image-manipulation";

export async function imageResize (req: Request, res: Response) {
    try {
        const isThereAPercentageVariable = "percentageScale" in req.body;
        if(!isThereAPercentageVariable) return res.status(400).json({
            success: "false",
            message: errorMessages.percentageVariableNotFound
        });
        
        const isPercentageTheRightScale = req.body.percentageScale >= 1 && req.body.percentageScale <= 99;
        if(!isPercentageTheRightScale) return res.status(400).json({
            success: "false",
            message: errorMessages.percentageNotBetween1And99
        });
        
        const isThereABase64StringVariable = "base64String" in req.body;
        if(!isThereABase64StringVariable) return res.status(400).json({
            success: "false",
            message: errorMessages.base64StringVariableNotFound
        });

        const { percentageScale, base64String } = req.body;

        const matchesOrError = prepareBase64ImageData(base64String);
        const statusCode = matchesOrError === errorMessages.notAnCompatibleImgType ? 415 : 400;
        
        const isMatchesAnError = !Array.isArray(matchesOrError);
        if(isMatchesAnError) return res.status(statusCode).json({
            success: "false",
            message: matchesOrError
        });
        
        const imageBuffer = decodeImg(matchesOrError);
        
        const filesLocation = {
            imageBuffer,
            sendFileLocation: path.join(__dirname, `../../../`, `images/output-${Date.now()}.jpg`)
        };
        
        const manipedImg = await imageManipulation(
            "resize",
            filesLocation.imageBuffer,
            filesLocation.sendFileLocation,
            { percentageScale }
        );
        return res.status(200).json({
            success: "true",
            message: manipedImg
        });
    } catch (error) {
        logger.error(`${error}`, { manipulation: "resize"});
        return res.status(500).json({
            success: "false",
            message: errorMessages.internalServerError
        });
    }
};