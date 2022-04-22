import { Request, Response } from "express";
import logger from "../logger";

export default function imageLogger (req: Request, res: Response) {
    const { rawHeaders, httpVersion, method, body, url, params } = req;

    const headers = res.getHeaders();
    const { statusCode, locals: serverResponse } = res;
        logger.info(JSON.stringify({
            rawHeaders,
            httpVersion,
            url,
            method,
            params,
            body
        }));

        logger.info(JSON.stringify({
            headers,
            statusCode,
            serverResponse
        }));
};