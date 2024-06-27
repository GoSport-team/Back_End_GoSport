import { Router } from "express";
import {
  actualizarUsuario,
  crearUsuario,
  eliminarUsuario,
  obtenerUsuarioId,
  obtenerUsuarios,
} from "../controllers/usuarios";
// import { logMiddleware } from "../middleware/log";

const router = Router();

router.get("/", obtenerUsuarios);
router.get("/:id",  obtenerUsuarioId);
router.post("/", crearUsuario);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);

export { router };
