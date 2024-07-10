import { Auth } from "./auth.interface";

export interface Usuarios extends Auth {
  nombres: String;
  telefono: String;
  url_foto: String;
  identificacion: String;
  ficha: String,
  programa: String,
  finFicha: String,
  jornada: "mañana" | "tarde" |  "noche";
  estado: Boolean,
  rol: "jugador" | "organizador";
}
