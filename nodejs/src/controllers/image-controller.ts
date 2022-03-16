import path from "path";
import sharp from "sharp";
import { Request, Response } from "express";
import { errorMessages } from "../utils/errorMessages";
import { prepareBase64ImageData } from "../utils/prepareBase64ImageData";
import { decodeAndStoreImg } from "../utils/decodeAndStoreImg";
import { encodeToBase64 } from "../utils/encodeToBase64";

export function imageResize (req: Request, res: Response) {
    const isThereAPercentageVariable = 'percentageScale' in req.body;
    if(!isThereAPercentageVariable) return res.status(415).send(errorMessages.percentageVariableNotFound);
    
    const isPercentageTheRightScale = req.body.percentageScale >= 1 && req.body.percentageScale <= 99;
    if(!isPercentageTheRightScale) return res.status(415).send(errorMessages.percentageNotBetween1And99);
    
    const { percentageScale } = req.body;

    const matchesOrError = prepareBase64ImageData(req, res);
    
    const isMatchesAnError = !Array.isArray(matchesOrError);
    if(isMatchesAnError) return matchesOrError;
    
    const inputLocation = decodeAndStoreImg(matchesOrError, res);
    
    const filesLocation = {
        inputLocation,
        sendFileLocation: path.join(__dirname, '../../', `images/output-${Date.now()}.jpg`)
    };
    
    imageManipulationResize(
        percentageScale,
        filesLocation.inputLocation,
        filesLocation.sendFileLocation,
        res
    );
};

async function imageManipulationResize(
        percentScale: number,
        fileLocation: string,
        outputLocation: string,
        res: Response
    ) {
    try {
        const imgWidth = await sharp(fileLocation).metadata()
        .then(metadata => {
            if(metadata.width) return metadata.width;
            return 0;
        });

        const newWidth = Math.round(imgWidth * (percentScale / 100));
        
        return sharp(fileLocation)
            .resize( {
                width: newWidth,
                fit: 'contain'
            })
            .toFile(outputLocation, function(error) {
                if(error) throw error;

                const responseMessage = encodeToBase64(outputLocation);
                console.log('The image was successfully resized!');
        
                return res.status(200).json({
                    success: true,
                    message: responseMessage
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