
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
  actualizarFoto
} from "../controllers/usuarios";


const router = Router();


router.get("/", obtenerUsuarios);
router.get("/:id", obtenerUsuarioId);
router.put("/:id", actualizarUsuario);
router.patch('/:id', PatchesUsuario)
router.post("/", crearUsuario);
router.delete("/:id", eliminarUsuario);
router.get("/identificacion/:identificacion", obtenerIdIdenfiticacion);
router.get("/perfil", obtenerPerfilUsuario);


router.post('/:id/foto', subirFoto);
router.delete('/:id/eli',eliminarFoto);
router.patch('/:id/pati', actualizarFoto)


export {router};
