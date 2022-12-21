import { Router } from "express";
import { signin, signup } from "../controllers/authentication.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/teste");

export default router;