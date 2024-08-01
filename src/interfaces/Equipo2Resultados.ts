import { InscripcionEquipos } from "./incripcionEquipos.interface";
import { Jugador } from "./jugador.interface";

export interface Equipo2{
    equipo2: InscripcionEquipos,
    tarjetasAmarillas:object,
    tarjetasRojas:object,
    goles:string,
    jugadorDestacado: Jugador,
}