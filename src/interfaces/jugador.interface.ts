import { Usuarios } from "./usuarios.interface";

export interface Jugador extends Usuarios{
    ficha: String,
    programa: String,
    finFicha: Date,
    jornada: "Mañana"|"Tarde" | "Noche",
    esCapitan: Boolean 
  
};
