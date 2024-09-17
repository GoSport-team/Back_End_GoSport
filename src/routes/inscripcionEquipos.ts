import { Router } from "express";
import {
  // equiposGanadores,
  guardarInscripcionDeEquipo,
  obtenerInscripcionEquipo,
  obtenerInscripcionesEquipos,
  actualizarEquipo,
  actualizarEquipoCompleto,
  eliminarEquipo,
  subirFoto,
  actualizarLogo,
  actualizarEquipoEstado
} from "../controllers/IncripconEquipos";

const router = Router();
//colocar id discriptivo
// router.get('/ganadores', equiposGanadores)

router.patch("/completo/:id", actualizarEquipoCompleto);
router.get("/", obtenerInscripcionesEquipos);
router.get("/:id", obtenerInscripcionEquipo);
router.post("/", guardarInscripcionDeEquipo);
router.patch("/:id", actualizarEquipo);
router.patch("/estado/:id", actualizarEquipoEstado);
router.delete("/:id", eliminarEquipo);
router.post("/:id/logoEquipo", subirFoto);
router.patch("/:id/:idLogo", actualizarLogo);

export { router };
