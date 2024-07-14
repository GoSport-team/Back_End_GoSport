import { Schema, model } from "mongoose";
import { Sede } from "../interfaces/sede.interface"; // Asegúrate de que la importación apunte a la interfaz correcta

const SedeSchema = new Schema<Sede>(
    {
        nombreSede: {
            type: String,
        },
    }
);

const SedeModel = model("Sede", SedeSchema);

export default SedeModel;