import { Request, Response } from "express";
import { errorMessages } from "./errorMessages";
import validateRequestIsBase64Format from "./validate-base64-request";
import validateRequestIsImg from "./validate-request-is-img";

export function prepareBase64ImageData(req: Request,res: Response) {
    const isThereABase64StringVariable = 'base64String' in req.body;
    if(!isThereABase64StringVariable) return res.status(415).json({
        success: "false",
        message: errorMessages.base64StringVariableNotFound
    });

    /* const isThereAPercentageVariable = 'percentage-scale' in req.body;
    if(!isThereAPercentageVariable) return res.status(415).send(errorMessages.percentageVariableNotFound);

    const isPercentageTheRightScale = req.body.percentageScale >= 1 && req.body.percentageScale <= 99;
    if(!isPercentageTheRightScale) return res.status(415).send(errorMessages.percentageNotBetween1And99); */

    const { base64String } = req.body;
    const foundMatches = validateRequestIsBase64Format(base64String);
    if(!foundMatches) return res.status(415).json({
        success: false,
        message: errorMessages.notBase64Structured
    });
    
    const isCompatibleImage = validateRequestIsImg(foundMatches[1]);
    if(!isCompatibleImage) return res.status(415).json({
        success: false,
        message: errorMessages.notAnJpegOrPng
    });

    return foundMatches;
}