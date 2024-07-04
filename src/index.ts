import express from "express";
import cors from "cors";
import { router } from "./routes";
import db from "./config/db";
import cookieParser from "cookie-parser";
const PORT = 3001;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(router);

db();

app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));
