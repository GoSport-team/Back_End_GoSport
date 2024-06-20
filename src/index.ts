import express from "express";

import { router } from "./routes";
import db from "./config/db";
import cors from 'cors'
const PORT =3001;
const app = express();

app.use(express.json());
app.use(router);

app.use(cors())
db()
app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));