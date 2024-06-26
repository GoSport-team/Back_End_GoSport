import { Auth } from "./auth.interface";

export interface Usuarios extends Auth {
  nombres: String;
  telefono: String;
  genero: String;
  url_foto: String;
  identificacion: String;
  rol: "jugador" | "organizador";
}
