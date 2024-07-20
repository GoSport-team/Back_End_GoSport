import { Usuarios } from "./usuarios.interface";

export default interface Jugador extends Usuarios{
    ficha: String,
    programa: String,
    finFicha: Date,
    jornada: "Mañana"|"Tarde" | "Noche",
  
};
