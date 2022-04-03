import express from "express";
import { notDefined } from "../controllers/not-defined";

import { imageResize } from "../controllers/image-controllers/image-resize";
import { imageGrayScale } from "../controllers/image-controllers/image-grayscale";
import { imageTransformation } from "../controllers/image-controllers/image-transformation";

const router = express.Router();

router.post("/resize", imageResize);

router.get("/resize", notDefined);
router.put("/resize", notDefined);
router.delete("/resize", notDefined);
router.patch("/resize", notDefined);

router.post("/grayscale", imageGrayScale);

router.get("/grayscale", notDefined);
router.put("/grayscale", notDefined);
router.delete("/grayscale", notDefined);
router.patch("/grayscale", notDefined);

router.post("/transformation", imageTransformation);

router.get("/transformation", notDefined);
router.put("/transformation", notDefined);
router.delete("/transformation", notDefined);
router.patch("/transformation", notDefined);

export default router;