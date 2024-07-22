import { Router } from "express";
import {
  actualizarUsuario,
  crearUsuario,
  eliminarUsuario,
  obtenerIdIdenfiticacion,
  obtenerUsuarioId,
  obtenerUsuarios,
  PatchesUsuario,
  obtenerPerfilUsuario,
} from "../controllers/usuarios";
import { checkJwt } from "../middleware/session";

const router = Router();

router.get("/identificacion/:identificacion", obtenerIdIdenfiticacion);
router.get("/perfil", checkJwt, obtenerPerfilUsuario);
router.get("/", obtenerUsuarios);
router.get("/:id", obtenerUsuarioId);
router.post("/", crearUsuario);
router.put("/:id", actualizarUsuario);
router.patch("/:id", PatchesUsuario);
router.delete("/:id", eliminarUsuario);

export { router };
