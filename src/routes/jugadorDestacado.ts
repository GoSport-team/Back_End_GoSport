import { Router } from "express";
import { insert, getTodoJugadorDestacado, getByIdJugador } from "../controllers/jugadorDestacado";

const router = Router();
router.get ('/', getTodoJugadorDestacado)
router.get('/:id', getByIdJugador)
router.post('/',insert
)
export{
    router
}