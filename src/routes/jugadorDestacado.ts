import { Router } from "express";
import {
  deleteJugadorDestacado,
  getJugadoresDestacados,
  insertJugadorDestacado,
} from "../controllers/jugadorDestacado";
const router = Router();
router.get("/", getJugadoresDestacados);
router.post("/", insertJugadorDestacado);
router.delete("/:id", deleteJugadorDestacado);
export { router };
