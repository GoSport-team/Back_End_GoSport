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

    url_foto: {
      type: String,
    },
    identificacion: {
      type: String,
      required: true,
    },
    ficha: {
      type: String,
      required: true,
    },
    programa: {
      type: String,
    },
    finFicha: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      required: true,
      enum: ["jugador", "organizador"],
      default: "jugador",
    },
    jornada: {
      type: String,
      required: true,
      enum: ["mañana", "tarde", "noche"],
    },
    estado: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const UsuarioModel = model<Usuarios>("usuarios", UsuarioSchema);
export default UsuarioModel;
