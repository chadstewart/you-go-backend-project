import { Request, Response } from "express";
import { loggerWrapper } from "../logger";

export default function imageLogger (req: Request, res: Response) {
    const { rawHeaders, httpVersion, method, body, url, params } = req;
    const headers = res.getHeaders();
    const { statusCode, locals: serverResponse } = res;

    loggerWrapper("info", JSON.stringify({
        rawHeaders,
        httpVersion,
        url,
        method,
        params,
        body
    }));

    const isStatusCodeIn200Range = 200 <= statusCode && statusCode < 300;

    if(isStatusCodeIn200Range) {
        loggerWrapper("info", JSON.stringify({
            headers,
            statusCode,
            serverResponse
        }));
    } else {
        loggerWrapper("warn", JSON.stringify({
            headers,
            statusCode,
            serverResponse
        }));
    }
};