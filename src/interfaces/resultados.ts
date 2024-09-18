
import { Equipo1 } from "./Equipo1Resultados";
import { Equipo2  } from "./Equipo2Resultados";
export interface Resultado{
    equipo1:Equipo1,
    equipo2:Equipo2,
    IdVs:string,
    IdFase: string,
    estadoPartido: boolean,
    idPlanillero:string,
    idCampeonato: string,
    penales:boolean,
    numeroTiros:string
    // idCampeonato: String
}