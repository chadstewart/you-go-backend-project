import { Request, Response } from "express";
import { errorMessages } from "../utils/error-utils";

export function notDefined (req: Request, res: Response) {
    return res.status(501).json({
        success: false,
        message: errorMessages.notImplemented
    });
};