import { NextFunction, Request, Response } from "express";
import logger from "../logger";
import CustomResponse from "../interfaces/custom-response";

export default function imageLogger (req: Request, res: Response, next: NextFunction) {
    const { rawHeaders, httpVersion, method, body, url, params } = req;
    const isRequestToAnImageEndpoint = req.path.includes('/image');

    const headers = res.getHeaders();
    const { statusCode, statusMessage } = res;

    if(isRequestToAnImageEndpoint) {
        logger.info(JSON.stringify({
            rawHeaders,
            httpVersion,
            url,
            method,
            params,
            body
        }));
        next();
        logger.info(JSON.stringify({
            headers,
            statusCode,
            statusMessage
        }));
    }
};