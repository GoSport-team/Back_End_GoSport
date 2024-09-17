import { Auth } from "./auth.interface";

export interface Usuarios extends Auth {
  nombres: String;
  telefono: String;
  url_foto: String;
  identificacion: String;
  estado: Boolean;
  rol: string;
  public_id: string;
  resetPasswordToken?: string; // Permitir undefined
  resetPasswordExpires?: Date; // Permitir undefined
}
