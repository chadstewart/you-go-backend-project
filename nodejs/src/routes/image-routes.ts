import express from "express";
import { notDefined } from "../controllers/not-defined";

import { imageResize } from "../controllers/image-controllers/image-resize";
import { imageGrayScale } from "../controllers/image-controllers/image-grayscale";

const router = express.Router();

router.post("/image_resize", imageResize);

router.get("/image_resize", notDefined);
router.put("/image_resize", notDefined);
router.delete("/image_resize", notDefined);
router.patch("/image_resize", notDefined);

router.post("/image_grayscale", imageGrayScale);

router.get("/image_grayscale", notDefined);
router.put("/image_grayscale", notDefined);
router.delete("/image_grayscale", notDefined);
router.patch("/image_grayscale", notDefined);

export default router;