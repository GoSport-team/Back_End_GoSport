import { Router } from "express";
import {
    validarInscripcionIntegrantee,
    obtenerEquipoInscripto,
    obtenerEquiposInscriptos,
    actualizarEquipoInscripto,
    eliminarEquipoInscripto,
    GuardarEquiposInscriptos,
    obtenerEquipoCedula,
    verificarSiEquipoYaEstaInscrito,
    eliminarPorIdEquipo,
    verificarSiEquipoYaEstaInscritoEstado
} from '../controllers/equiposInscriptos'

const router = Router();

router.get('/validarJugador',  validarInscripcionIntegrantee)

router.get('/validarInscripcion', verificarSiEquipoYaEstaInscrito)
router.get('/validarInscripcionestado', verificarSiEquipoYaEstaInscritoEstado)

router.get("/",obtenerEquiposInscriptos);

router.get("/cedula/:id", obtenerEquipoCedula)

router.get("/:id",  obtenerEquipoInscripto);

router.post("/",    GuardarEquiposInscriptos);

router.patch("/:id", actualizarEquipoInscripto);

router.delete("/:id", eliminarEquipoInscripto);
router.delete("/idEquipo/:equipoId", eliminarPorIdEquipo)

export { router };
