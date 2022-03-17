import path from "path";
import sharp from "sharp";
import { Request, Response } from "express";
import { errorMessages } from "../../utils/errorMessages";
import { prepareBase64ImageData } from "../../utils/prepareBase64ImageData";
import { decodeAndStoreImg } from "../../utils/decodeAndStoreImg";
import { encodeToBase64 } from "../../utils/encodeToBase64";

export function imageResize (req: Request, res: Response) {
    try {
        const isThereAPercentageVariable = 'percentageScale' in req.body;
        if(!isThereAPercentageVariable) return res.status(400).json({
            success: "false",
            message: errorMessages.percentageVariableNotFound
        });
        
        const isPercentageTheRightScale = req.body.percentageScale >= 1 && req.body.percentageScale <= 99;
        if(!isPercentageTheRightScale) return res.status(400).json({
            success: "false",
            message: errorMessages.percentageNotBetween1And99
        });
        
        const isThereABase64StringVariable = 'base64String' in req.body;
        if(!isThereABase64StringVariable) return res.status(400).json({
            success: "false",
            message: errorMessages.base64StringVariableNotFound
        });

        const { percentageScale, base64String } = req.body;

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
        
        imageManipulation(
            percentageScale,
            filesLocation.inputLocation,
            filesLocation.sendFileLocation,
            res
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: "false",
            message: errorMessages.internalServerError
        });
    }
};

async function imageManipulation(
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
            .toFile(outputLocation, () => {
                const responseMessage = encodeToBase64(outputLocation);
                console.log('The image was successfully resized!');

                return res.status(200).json({
                    success: true,
                    message: responseMessage
                });
            });
    } catch (error) {
        throw error;
    }
};