import {Request, Response} from "express";
import logger from "../logger";

export default function index (req: Request, res: Response) {
    logger.info("Someone accessed root endpoint");
    res.status(200).send("Server is live!");
};