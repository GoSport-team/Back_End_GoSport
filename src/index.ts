import express from "express";
import cors from "cors";
import { router } from "./routes";
import db from "./config/db";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from 'dotenv'

dotenv.config();


const PORT = 3001;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
console.log(__dirname)
app.use(router);

db();

app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));
