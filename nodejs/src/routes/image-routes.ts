import express from "express";
import { notDefined } from "../controllers/not-defined";

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

//Endpoint verbs not implemented

router.get("/resize", notDefined);
router.put("/resize", notDefined);
router.delete("/resize", notDefined);
router.patch("/resize", notDefined);

router.get("/grayscale", notDefined);
router.put("/grayscale", notDefined);
router.delete("/grayscale", notDefined);
router.patch("/grayscale", notDefined);

router.get("/transformation", notDefined);
router.put("/transformation", notDefined);
router.delete("/transformation", notDefined);
router.patch("/transformation", notDefined);

router.get("/blur", notDefined);
router.put("/blur", notDefined);
router.delete("/blur", notDefined);
router.patch("/blur", notDefined);

router.get("/negate", notDefined);
router.put("/negate", notDefined);
router.delete("/negate", notDefined);
router.patch("/negate", notDefined);

export default router;