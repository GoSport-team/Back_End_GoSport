import { Router } from "express";
import {
    obtenerEquipoInscripto,
    obtenerEquiposInscriptos,
    actualizarEquipoInscripto,
    eliminarEquipoInscripto,
    GuardarEquiposInscriptos
} from '../controllers/equiposInscriptos'
import { getEquiposInscriptos, getEquitoInscripto } from "../services/equiposInscriptos";


const router = Router();

router.get("/", getEquiposInscriptos);

router.get("/:id",  getEquitoInscripto);

router.post("/",    GuardarEquiposInscriptos);

router.patch("/:id", actualizarEquipoInscripto);

router.delete("/:id", eliminarEquipoInscripto);

export { router };
