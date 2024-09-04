
import { Router } from "express";


import {
  obtenerUsuarios,
  obtenerUsuarioId,
  actualizarUsuario,
  obtenerIdIdenfiticacion,
  crearUsuario,
  eliminarUsuario,
  PatchesUsuario,
  obtenerPerfilUsuario,
  subirFoto,
  eliminarFoto,
  actualizarFoto,
  buscarPorIdentificacionParcial,
  obtenerIdIdenfiticacionPlanillero
} from "../controllers/usuarios";
import { checkJwt } from "../middleware/session";


const router = Router();


router.get("/perfil",checkJwt, obtenerPerfilUsuario);
router.get("/", obtenerUsuarios);
router.get("/:id", obtenerUsuarioId);
router.put("/:id", actualizarUsuario);
router.patch('/:id', PatchesUsuario)
router.post("/", crearUsuario);
router.delete("/:id", eliminarUsuario);
router.get("/identificacion/buscar", buscarPorIdentificacionParcial);
router.get("/identificacion/:identificacion", obtenerIdIdenfiticacion);
router.get("/planillero/:identificacion", obtenerIdIdenfiticacionPlanillero)

router.post('/:id/foto', subirFoto);
router.delete('/:id/eli',eliminarFoto);
router.patch('/:id/pati', actualizarFoto)


export {router};
