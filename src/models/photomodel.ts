import { Schema, model } from "mongoose";
import { Photos } from "../interfaces/photointerface";

const FotoSchema = new Schema<Photos>(
    {
        Nombre: {
            type: String,
            required: true
        },
        Descripcion: {
            type: String,
            required: true
        },
        Imagepath: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true // Si quieres añadir timestamps (createdAt y updatedAt)
    }
);

const modelPhotos = model<Photos>("Foto", FotoSchema);
export default modelPhotos;
