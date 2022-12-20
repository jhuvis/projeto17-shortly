import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/authRoutes.js";


const app = express();
app.use(cors());
app.use(express.json());

app.use(authRoutes);


const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port: ${port}`));