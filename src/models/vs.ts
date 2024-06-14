import { Schema, model } from "mongoose";
import { VS } from "../interfaces/vs.interface";

const VSShema = new Schema<VS>(
    {
        equipo1: {
            type: Schema.Types.Mixed,
            require: true,
            trim: true
        },
        equipo2: {
            type: Schema.Types.Mixed,
            require: true,
            trim: true
        },
        IdFase: {
            type: String,
            require: false,
            trim: true
        },
        fecha: {
            type: String,
            require: false,
            trim: true
        },
        hora: {
            type: String,
            require: false,
            trim: true
        },
        estado:{
            type: Boolean,
            require: false
        }  
    },
    {timestamps:true}
)

const VSModel = model('VS', VSShema);

export default VSModel;