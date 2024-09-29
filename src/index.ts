import express from "express";
import cors from "cors";
import { router } from "./routes";
import db from "./config/db";
import cookieParser from "cookie-parser";
import path from "path";
import 'dotenv/config';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      `http://localhost:${PORT}`,
      "https://front-end-go-sport.vercel.app"
    
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);



app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(router);

db();

app.listen(PORT, () => {
  console.log(`Listo por el puerto ${PORT}`);
});
