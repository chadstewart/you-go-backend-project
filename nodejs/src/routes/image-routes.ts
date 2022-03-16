import express from "express";
import { notDefined } from "../controllers/not-defined";
const router = express.Router();

import {

    imageResize
    
    } from "../controllers/image-controller";

router.post("/image_resize", imageResize);

router.get("/image_resize", notDefined);
router.put("/image_resize", notDefined);
router.delete("/image_resize", notDefined);
router.patch("/image_resize", notDefined);

export default router;