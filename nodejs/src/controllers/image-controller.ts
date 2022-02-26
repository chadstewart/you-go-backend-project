import {Request, Response} from "express";
import validateRequestIsImg from "../utils/validate-request-img";

const wrongContentErrorMsg = "Please send an image that is .jpg, .jpeg, .jpe or .png";

export function imageResize (req: Request, res: Response) {
    const isValidRequestType = validateRequestIsImg(req);

    if(isValidRequestType) {

    }

    return res.status(400).send(wrongContentErrorMsg);
};