import { Request, Response } from "express";
import { prepareData } from "../utils/prepareData";
import { decodeAndStoreImg } from "../utils/decodeAndStoreImg";

export function imageResize (req: Request, res: Response) {
    const matches = prepareData(req, res);
    const isMatchesAnArray = Array.isArray(matches);
    if(isMatchesAnArray) return decodeAndStoreImg(matches, res);
    return matches;
};