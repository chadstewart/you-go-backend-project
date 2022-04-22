import path from "path";
import { NextFunction, Request, Response } from "express";
import { errorMessages } from "../../utils/error-utils";
import { prepareBase64ImageData } from "../../utils/prepare-base64-image-data";
import { decodeImg } from "../../utils/base64-utils";
import imageManipulation from "../../services/image-manipulation";
import logger from "../../logger";

export async function imageBlur (req: Request, res: Response, next: NextFunction) {
    try {
        const isThereABase64StringVariable = "base64String" in req.body;
        if(!isThereABase64StringVariable) {
            const responseToUser = {
                success: "false",
                message: errorMessages.base64StringVariableNotFound
            };

            res.locals.success = responseToUser.success;
            res.locals.message = responseToUser.message;
            
            res.status(400).json(responseToUser);

            return next();
        }

        const { base64String } = req.body;

        const matchesOrError = prepareBase64ImageData(base64String);
        const statusCode = matchesOrError === errorMessages.notAnCompatibleImgType ? 415 : 400;
        
        const isMatchesAnError = !Array.isArray(matchesOrError);
        if(isMatchesAnError) {
            const responseToUser = {
                success: "false",
                message: matchesOrError
            };

            res.locals.success = responseToUser.success;
            res.locals.message = responseToUser.message;
            
            res.status(statusCode).json(responseToUser);

            return next();
        }
        
        const imageBuffer = decodeImg(matchesOrError);
        
        const filesLocation = {
            imageBuffer,
            sendFileLocation: path.join(__dirname, `../../../`, `images/output-${Date.now()}.jpg`)
        };

        const manipedImg = await imageManipulation(
            "blur",
            filesLocation.imageBuffer,
            filesLocation.sendFileLocation
        );

        const responseToUser = {
            success: "true",
            message: manipedImg
        }

        res.locals.success = responseToUser.success;
        res.locals.message = responseToUser.message;
        res.status(200).json(responseToUser);

        return next();
    } catch (error) {
        logger.error(`${error}`, { manipulation: "blur"});
        return res.status(500).json({
            success: "false",
            message: errorMessages.internalServerError
        });
    }
};