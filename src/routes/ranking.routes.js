import { Router } from "express";
import { cauculateRanking } from "../controllers/ranking.controller.js";

const router = Router();

router.get("/ranking", cauculateRanking)

export default router;