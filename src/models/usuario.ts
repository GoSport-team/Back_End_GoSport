import { Schema, model } from "mongoose";
import { Usuarios } from "../interfaces/usuarios.interface";
import roles from "../config/rolesConfig";

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
      unique: true,
      index: true
    },
    rol: {
      type: String,
      enum: Object.values(roles),
      default: roles.JUGADOR,
    },
    estado: {
      type: Boolean,
      default: true,
    },
    public_id:{
      type:String,
      
    },
    resetPasswordToken:{
      type: String,
      default: undefined,
    },
    resetPasswordExpires: { 
      type: Date,
      default: undefined,
     }
  },
  {
    timestamps: true,
    discriminatorKey: "role",
  }
);

const UsuarioModel = model<Usuarios>("usuarios", UsuarioSchema);
export default UsuarioModel;
