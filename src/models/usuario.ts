import { Schema, model } from "mongoose";
import { Usuarios } from "../interfaces/usuarios.interface";

const UsuarioSchema = new Schema<Usuarios>(
  {
    nombres: {
      type: String,
      trim: true,
      required: true,
    },
    telefono: {
      type: String,
      trim: true,
      required: true,
    },
    correo: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    contrasena: {
      type: String,
      trim: true,
      required: true,
    },

    url_foto: {
      type: String,
    },
    identificacion: {
      type: String,
      trim: true,
      required: true,
    },
    ficha: {
      type: String,
      trim: true,
      required: true,
    },
    programa: {
      type: String,
      trim: true,
    },
    finFicha: {
      type: String,
      trim: true,
      required: true,
    },
    rol: {
      type: String,
      required: true,
      trim: true,
      enum: ["jugador", "organizador"],
      default: "jugador",
    },
    jornada: {
      type: String,
      required: true,
      trim: true,
      enum: ["mañana", "tarde", "noche"],
    },
    estado: {
      type: Boolean,
      trim: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const UsuarioModel = model<Usuarios>("usuarios", UsuarioSchema);
export default UsuarioModel;
