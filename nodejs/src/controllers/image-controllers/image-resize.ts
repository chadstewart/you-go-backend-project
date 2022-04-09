import path from "path";
import sharp from "sharp";
import fs from "fs";
import { Request, Response } from "express";
import { errorMessages } from "../../utils/error-utils";
import { prepareBase64ImageData } from "../../utils/prepare-base64-image-data";
import { decodeImg, encodeToBase64 } from "../../utils/base64-utils";

export async function imageResize (req: Request, res: Response) {
    try {
        const isThereAPercentageVariable = "percentageScale" in req.body;
        if(!isThereAPercentageVariable) return res.status(400).json({
            success: "false",
            message: errorMessages.percentageVariableNotFound
        });
        
        const isPercentageTheRightScale = req.body.percentageScale >= 1 && req.body.percentageScale <= 99;
        if(!isPercentageTheRightScale) return res.status(400).json({
            success: "false",
            message: errorMessages.percentageNotBetween1And99
        });
        
        const isThereABase64StringVariable = "base64String" in req.body;
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
        
        const imageBuffer = decodeImg(matchesOrError);
        
        const filesLocation = {
            imageBuffer,
            sendFileLocation: path.join(__dirname, `../../../`, `images/output-${Date.now()}.jpg`)
        };
        
        const manipedImg = await imageManipulation(
            percentageScale,
            filesLocation.imageBuffer,
            filesLocation.sendFileLocation
        );
        return res.status(200).json({
            success: "true",
            message: manipedImg
        });
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
        imageBuffer: Buffer,
        outputLocation: string
    ) {
    try {
        const isThereNoImageFolder = !fs.existsSync("images");
        if(isThereNoImageFolder) fs.mkdirSync("images");

        const imgWidth = await sharp(imageBuffer).metadata()
        .then(metadata => {
            if(metadata.width) return metadata.width;
            return 0;
        });

        const newWidth = Math.round(imgWidth * (percentScale / 100));
        
        const manipedImg = sharp(imageBuffer)
            .resize( {
                width: newWidth,
                fit: "contain"
            });

            const { data: manipedImgBuffer } = await manipedImg.toBuffer({ resolveWithObject: true });
            
            //manipedImg.toFile(outputLocation, () => console.log("The image was successfully negated!"));
    
            const base64Img = encodeToBase64(manipedImgBuffer);

            return base64Img;
    } catch (error) {
        throw error;
    }
};