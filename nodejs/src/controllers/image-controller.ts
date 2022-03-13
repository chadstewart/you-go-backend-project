import { Request, Response } from "express";
import { prepareData } from "../utils/prepareData";
import { decodeAndStoreImg } from "../utils/decodeAndStoreImg";

export function imageResize (req: Request, res: Response) {
    const matchesOrError = prepareData(req, res);
    const isMatchesAnError = !Array.isArray(matchesOrError);
    if(isMatchesAnError) return matchesOrError;
    const fileLocation = decodeAndStoreImg(matchesOrError, res);
    imageManipulation(fileLocation);
};

function imageManipulation(fileLocation: string) {

};