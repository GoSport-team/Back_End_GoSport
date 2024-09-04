import { InscripcionEquipos } from "./incripcionEquipos.interface";

export interface EquiposInscriptos{
    Equipo: {
        equipo:InscripcionEquipos,
        esCapitan: boolean
    },
    idCampeonato: string
}