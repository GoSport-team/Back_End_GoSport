import { InscripcionEquipos } from "./incripcionEquipos.interface";
import { Jugador } from "./jugador.interface";

export interface Equipo1{
    equipo1: InscripcionEquipos,
    tarjetasAmarillas:object,
    tarjetasRojas:object,
    goles:string,
    jugadorDestacado: Jugador
}