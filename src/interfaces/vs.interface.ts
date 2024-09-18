import { InscripcionEquipos } from "./incripcionEquipos.interface";
export interface VS {
    equipo1:InscripcionEquipos,
    equipo2:InscripcionEquipos,
    IdFase: string,
    fecha:string,
    hora:string,
    estado: boolean,
    idPlanillero:string,
    idCampeonato: string
}