import { Router } from "express";
import {
    validarInscripcionIntegrantee,
    obtenerEquipoInscripto,
    obtenerEquiposInscriptos,
    actualizarEquipoInscripto,
    eliminarEquipoInscripto,
    GuardarEquiposInscriptos
} from '../controllers/equiposInscriptos'
// import { idHeadersEquiposInscritos } from "../middleware/Id_EquiposInscritos";

const router = Router();

router.get('/validarJugador/:id',  validarInscripcionIntegrantee)

router.get("/",obtenerEquiposInscriptos);

router.get("/:id",  obtenerEquipoInscripto);

router.post("/",    GuardarEquiposInscriptos);

router.patch("/:id", actualizarEquipoInscripto);

router.delete("/:id", eliminarEquipoInscripto);

export { router };
