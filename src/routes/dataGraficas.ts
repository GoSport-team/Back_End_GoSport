import { Router } from "express";
import { dataConteoCampeonatos, dataConteoEquipos, dataConteoParticipantes } from "../controllers/datosGraficas";


const router = Router()

router.get('/equipos', dataConteoEquipos)
router.get('/participantes', dataConteoParticipantes);
router.get('/campeonatos', dataConteoCampeonatos)

export { router };