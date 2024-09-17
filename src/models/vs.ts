import { Schema, model } from "mongoose";
import { VS } from "../interfaces/vs.interface";

const VSShema = new Schema<VS>(
    {
        equipo1: {
            type: Schema.Types.Mixed,
            required: true,

        },
        equipo2: {
            type: Schema.Types.Mixed,
            required: true,        },
        IdFase: {
            type: String,
            required: true,
        },
        fecha: {
            type: String,
            required: false,
            trim: true
        },
        hora: {
            type: String,
            required: false,
            trim: true
        },
        estado:{
            type: Boolean,
            required: false,
            default: true
        }, 
        idPlanillero:{
            type:String,
            required: false
        },
        idCampeonato:{
            type:String,
            required: true
        }
          
    },
    {timestamps:true}
)

const VSModel = model('VS', VSShema);

export default VSModel;