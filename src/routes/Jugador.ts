import { Router } from "express";
import  {obtnerJugdor,guardarJugador,obtenerIdJugador, eliminarJugador, actualizarJugador}  from "../controllers/Jugador";
const router = Router();

router.get('/', obtnerJugdor );
router.post('/',guardarJugador);
router.get('/:id',obtenerIdJugador);
router.delete('/:id',eliminarJugador);
router.put('/:id', actualizarJugador)

export {router};