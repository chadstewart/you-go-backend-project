import { Request } from "express";
import validImageTypes from "./valid-img-types";

export default function validateRequestIsImg (req: Request) {
    for(const [key, value] of Object.entries(validImageTypes)) {
        if(req.is(key)) return true;
    }

    return false;
}