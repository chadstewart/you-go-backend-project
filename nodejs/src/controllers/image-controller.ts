import { Request, Response } from "express";
import { prepareData } from "../utils/prepareData";
import { decodeAndStoreImg } from "../utils/decodeAndStoreImg";
import path from "path";
import sharp from "sharp";

export function imageResize (req: Request, res: Response) {
    const matchesOrError = prepareData(req, res);
    
    const isMatchesAnError = !Array.isArray(matchesOrError);
    if(isMatchesAnError) return matchesOrError;
    
    const inputLocation = decodeAndStoreImg(matchesOrError, res);
    
    const filesLocation = {
        inputLocation,
        sendFileLocation: path.join(__dirname, '../../', `images/output-${Date.now()}.jpg`)
    };
    
    imageManipulation(filesLocation.inputLocation, filesLocation.sendFileLocation, res);
};

function imageManipulation(fileLocation: string, outputLocation: string, res: Response) {
    sharp(fileLocation)
        .resize(300, 200, {
            fit: 'contain'
        })
        .toFile(outputLocation, function(error) {
            // output.jpg is a 300 pixels wide and 200 pixels high image
            // containing a scaled and cropped version of input.jpg

            if(error) throw error;
    
            return res.status(200).sendFile(outputLocation);
        });
    
    return;
};