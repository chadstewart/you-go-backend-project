import path from "path";
import sharp from "sharp";
import { Request, Response } from "express";
import { errorMessages } from "../utils/errorMessages";
import { prepareBase64ImageData } from "../utils/prepareBase64ImageData";
import { decodeAndStoreImg } from "../utils/decodeAndStoreImg";
import { encodeToBase64 } from "../utils/encodeToBase64";

export function imageResize (req: Request, res: Response) {
    const matchesOrError = prepareBase64ImageData(req, res);
    
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
    try {
        return sharp(fileLocation)
            .resize(300, 200, {
                fit: 'contain'
            })
            .toFile(outputLocation, function(error) {
                // output.jpg is a 300 pixels wide and 200 pixels high image
                // containing a scaled and cropped version of input.jpg

                if(error) throw error;
        
                return res.status(200).json({
                    success: true,
                    message: encodeToBase64(outputLocation)
                });
            });
    } catch (error) {
        res.status(500).json({
            success: "false",
            message: errorMessages.internalServerError
        });
        throw error;
    }
};