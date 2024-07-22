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
        ImageUrl: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const modelPhotos = model<Photos>("Foto", FotoSchema);
export default modelPhotos;
