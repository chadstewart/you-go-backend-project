import { Request, Response } from "express";
import { errorMessages } from "../utils/errorMessages";
import validateRequestIsBase64Format from "../utils/validate-base64-request";
import validateRequestIsImg from "../utils/validate-request-is-img";

export function prepareData(req: Request,res: Response) {
    const isThereABase64StringVariable = 'base64String' in req.body;
    if(!isThereABase64StringVariable) return res.status(415).send(errorMessages.base64StringVariableNotFound);

    const { base64String } = req.body;
    const foundMatches = validateRequestIsBase64Format(base64String);
    if(!foundMatches) return res.status(400).send(errorMessages.notBase64Structured);
    
    const isCompatibleImage = validateRequestIsImg(foundMatches[1]);
    if(!isCompatibleImage) return res.status(415).send(errorMessages.notAnJpegOrPng);

    return foundMatches;
}