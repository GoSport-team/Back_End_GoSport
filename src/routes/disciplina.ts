import { Router } from "express";
import {
  obtenerDisciplina,
  obtenerDisciplinas,
  crearDisciplina,
  
} from "../controllers/disciplina"; 


const router = Router();

router.get("/", obtenerDisciplinas);

router.get("/:id", obtenerDisciplina);

router.post("/", crearDisciplina);


export { router };
