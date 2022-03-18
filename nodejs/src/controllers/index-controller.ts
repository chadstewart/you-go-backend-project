import {Request, Response} from "express";

export default function index (req: Request, res: Response) {
    res.status(200).send("Server is live!");
};