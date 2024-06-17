import { Schema, model } from "mongoose";
import { Usuarios } from "../interfaces/usuarios.interface";

const UsuarioSchema = new Schema<Usuarios>(
  {
    nombres: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    correo: {
      type: String,
      required: true,
      unique: true,
    },
    contrasena: {
      type: String,
      required: true,
    },
    genero: {
      type: String,
      required: true,
    },
    url_foto: {
      type: String,
      required: true,
    },
    identificacion: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      required: true,
      enum: ["jugador", "organizador"],
      default: "jugador",
    }
  },
  {
    timestamps: true,
  }
);

const UsuarioModel = model<Usuarios>("usuarios", UsuarioSchema);
export default UsuarioModel;