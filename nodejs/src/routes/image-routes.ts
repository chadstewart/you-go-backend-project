import express from "express";

import { imageResize } from "../controllers/image-controllers/image-resize";
import { imageGrayScale } from "../controllers/image-controllers/image-grayscale";
import { imageTransformation } from "../controllers/image-controllers/image-transformation";
import { imageBlur } from "../controllers/image-controllers/image-blur";
import { imageNegate } from "../controllers/image-controllers/image-negate";

const router = express.Router();

//Working Endpoints

router.post("/resize", imageResize);
router.post("/grayscale", imageGrayScale);
router.post("/transformation", imageTransformation);
router.post("/blur", imageBlur);
router.post("/negate", imageNegate);

export default router;