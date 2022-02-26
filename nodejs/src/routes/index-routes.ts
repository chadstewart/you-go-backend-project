import express from "express";
const router = express.Router();

import index_controller from "../controllers/index-controller";

router.get("/", index_controller);

export default router;