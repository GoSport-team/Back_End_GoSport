import { Schema, model } from "mongoose";
import { vsInter } from "../interfaces/vsInter.interface";

const vsInterShema= new Schema<vsInter>(
   { 
    equipo1:{
    type: Schema.Types.Mixed,
    require: true,
    trim: true
    },
    equipo2:{
        type: Schema.Types.Mixed,
        require: true,
        trim: true  
    },
    fecha: {
        type: String,
        require: false,
        trim: true
    },
    idPlanillero:{
        type: String,
        require: false,
    },
    idCampeonato:{
        type : String,
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
const vsInterModel= model('VsInter', vsInterShema)
export default vsInterModel;