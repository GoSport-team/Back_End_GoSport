import { Router } from "express";
import {
    validarInscripcionIntegrantee,
    obtenerEquipoInscripto,
    obtenerEquiposInscriptos,
    actualizarEquipoInscripto,
    eliminarEquipoInscripto,
    GuardarEquiposInscriptos
} from '../controllers/equiposInscriptos'

const router = Router();

router.get('/validarJugador/:id',  validarInscripcionIntegrantee)

router.get("/",obtenerEquiposInscriptos);

router.get("/:id",  obtenerEquipoInscripto);

router.post("/",    GuardarEquiposInscriptos);

router.patch("/:id", actualizarEquipoInscripto);

router.delete("/:id", eliminarEquipoInscripto);

export { router };
