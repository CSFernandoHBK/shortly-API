import { Router } from "express";
import { linkGenerator } from "../controllers/urls.controller.js";

const router = Router();

router.post("/urls/shorten", linkGenerator)
router.get("/urls/:id")
router.get("/urls/open/:shortUrl")
router.delete("/urls/:id")

export default router;