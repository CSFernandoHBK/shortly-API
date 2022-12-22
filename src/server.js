import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectionDB } from "./database/db.js";
dotenv.config();

import authenticationRoutes from "./routes/authentication.routes.js";
import urlRoutes from "./routes/urls.routes.js";
import rankingRoutes from "./routes/ranking.routes.js";
import usersRoutes from "./routes/users.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authenticationRoutes);
app.use(urlRoutes);
app.use(rankingRoutes);
app.use(usersRoutes);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port: ${port}`));