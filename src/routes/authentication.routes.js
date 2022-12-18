import { Router } from "express";
import { signin, signup, teste } from "../controllers/authentication.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/teste", teste);

export default router;