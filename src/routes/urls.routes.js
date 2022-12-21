import { Router } from "express";
import { deleteUrl, getUrl, linkGenerator, redirectToUrl } from "../controllers/urls.controller.js";

const router = Router();

router.post("/urls/shorten", linkGenerator)
router.get("/urls/:id", getUrl)
router.get("/urls/open/:shortUrl", redirectToUrl)
router.delete("/urls/:id", deleteUrl)

export default router;