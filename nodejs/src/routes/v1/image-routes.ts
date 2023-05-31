import express from "express";

import { imageResize } from "../../controllers/v1/image-controllers/image-resize";
import { imageGrayScale } from "../../controllers/v1/image-controllers/image-grayscale";
import { imageTransformation } from "../../controllers/v1/image-controllers/image-transformation";
import { imageBlur } from "../../controllers/v1/image-controllers/image-blur";
import { imageNegate } from "../../controllers/v1/image-controllers/image-negate";

const router = express.Router();

//Working Endpoints

router.post("/resize", imageResize);
router.post("/grayscale", imageGrayScale);
router.post("/transformation", imageTransformation);
router.post("/blur", imageBlur);
router.post("/negate", imageNegate);

export default router;