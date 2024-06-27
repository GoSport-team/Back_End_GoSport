import express from "express";
import cors from 'cors'
import morgan from 'morgan'
import Path from "path";
import { router } from "./routes";
import db from "./config/db";
const PORT =3001;
const app = express();

app.use(express.json());

app.use(cors())
app.use(morgan('dev'))

app.use('/uploads',express.static(Path.resolve('uploads')));
db()

app.use(router)



app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));