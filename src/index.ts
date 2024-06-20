import express from "express";

import { router } from "./routes";
import db from "./config/db";
const PORT =3001;
const app = express();

app.use(express.json());
app.use(router);
db()


app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));