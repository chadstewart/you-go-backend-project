import express from "express";
const router = express.Router();

import {

    imageResize
    
    } from "../controllers/image-controller";

router.post("/image_resize", imageResize);

export default router;