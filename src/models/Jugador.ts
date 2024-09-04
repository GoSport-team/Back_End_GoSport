import { Schema } from "mongoose";
import UsuarioModel from "./usuario";
import { Jugador } from "../interfaces/jugador.interface";

const jugadorSchema = new Schema<Jugador>(
  {
    ficha: {
      type: String,
      // required: true,
    },
    programa: {
      type: String,
      // required: true,
    },
    finFicha: {
      type: Date,
      // required: true,
    },
    jornada: {
      type: String,
      // required: true,
      enum: ["Mañana", "Tarde", "Noche"],
    },
    esCapitan: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);
const JugadorModel = UsuarioModel.discriminator<Jugador>(
  "Jugador",
  jugadorSchema
);
export default JugadorModel;
