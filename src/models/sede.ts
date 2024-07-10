import { Schema, model } from "mongoose";
import { Sede } from "../interfaces/sede.interface"; // Asegúrate de que la importación apunte a la interfaz correcta

const SedeSchema = new Schema<Sede>(
    {
        nombreSede: {
            type: String,
            required: true
        },
        direccion: {
            type: String,
            required: true
        },
        ciudad: {
            type: String,
            required: true
        },
        capacidad: {
            type: Number,
            required: true
        },
        estado: {
            type: String,
            required: true 
        }
    },
    {
        timestamps: true
    }
);

const SedeModel = model("Sede", SedeSchema);

export default SedeModel;
