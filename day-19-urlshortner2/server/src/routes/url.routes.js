import { Router } from "express";
import { generateUrl, redirectUrl, deleteUrl, getAllUrls } from "../controllers/url.controller.js";

const router = Router();

router.get("/", getAllUrls);
router.post("/generate", generateUrl);
router.get("/:code", redirectUrl);
router.delete("/:code", deleteUrl);

export default router;