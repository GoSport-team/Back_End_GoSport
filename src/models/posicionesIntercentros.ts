import { Schema, model } from "mongoose";
import { posicionesIntercentros } from "../interfaces/posicionesIntercentros.interface";


const posicionesSchema = new Schema<posicionesIntercentros>({
    equipo:{
        type: Schema.Types.Mixed,
        required:true,
        trim: true
    },
    idCampeonato:{
        type:String,
        required:true,
        trim:true
    },
    pts:{
        type:Number,
        required:true,
        trim:true
    },
    goles:{
        type:Number,
        required:true,
        trim:true
    },
    amarillas:{
        type:Number,
        required:true,
        trim:true
    },
    rojas:{
        type:Number,
        required:true,
        trim:true
    }
},
{
    timestamps: true
})

const PosicionesIntercentros = model('posicionesIntercentros', posicionesSchema)

export default PosicionesIntercentros