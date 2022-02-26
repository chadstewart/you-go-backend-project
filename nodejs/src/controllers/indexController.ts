import {Request, Response} from 'express';

export default function index (req: Request, res: Response) {
    res.send("I finally got this silly thing working!");
};