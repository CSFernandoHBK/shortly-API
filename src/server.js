import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port: ${port}`));