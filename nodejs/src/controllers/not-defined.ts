import { Request, Response } from "express";
import { errorMessages } from "../utils/errorMessages";

export function notDefined (req: Request, res: Response) {
    return res.status(501).json({
        success: false,
        message: errorMessages.notImplemented
    });
};