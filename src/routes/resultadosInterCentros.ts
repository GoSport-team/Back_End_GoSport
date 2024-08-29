import { Router } from "express";
import { actualizarResultadoInter, eliminarResultadoInter, guardarResultadoInter, obtenerResultado1Inter, obtenerResultadosInter } from "../controllers/resultadosIntercentros";


const router = Router()



router.get('/', obtenerResultadosInter)

router.get('/:id', obtenerResultado1Inter)

router.post('/', guardarResultadoInter)

router.patch('/:id', actualizarResultadoInter)

router.delete('/:id', eliminarResultadoInter)

export {router}
