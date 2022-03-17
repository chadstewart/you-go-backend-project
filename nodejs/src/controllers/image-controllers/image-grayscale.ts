import path from "path";
import sharp from "sharp";
import { Request, Response } from "express";
import { errorMessages } from "../../utils/errorMessages";
import { prepareBase64ImageData } from "../../utils/prepareBase64ImageData";
import { decodeAndStoreImg } from "../../utils/decodeAndStoreImg";
import { encodeToBase64 } from "../../utils/encodeToBase64";

export function imageGrayScale (req: Request, res: Response) {
    try {
        const isThereABase64StringVariable = 'base64String' in req.body;
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
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: "false",
            message: errorMessages.internalServerError
        });
    }
};