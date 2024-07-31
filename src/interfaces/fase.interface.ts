import { InscripcionEquipos } from "../interfaces/incripcionEquipos.interface";
export interface Fase{
    estado: string,
    nombre: string,
    equiposGanadores: InscripcionEquipos,
    equiposPerdedores:InscripcionEquipos
}