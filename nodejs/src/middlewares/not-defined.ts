import { NextFunction, Request, Response } from "express";
import { errorMessages } from "../utils/error-utils";

export function notDefined (req: Request, res: Response, next: NextFunction) {
    const isNotAPostToControllers = req.path !== "/" && req.method !== "POST";
    if(isNotAPostToControllers) {
        return res.status(405).json({
            success: false,
            message: errorMessages.notImplemented
        });
    }
    next();
};