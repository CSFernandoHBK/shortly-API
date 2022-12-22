import { Router } from "express";
import { getInfoUser } from "../controllers/users.controller.js";

const router = Router();

router.get("/users/me", getInfoUser);

export default router;