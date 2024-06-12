import { Schema, model } from "mongoose";
import { Campeonato } from "../interfaces/campeonato.infertace";

const CampeonatoShema = new Schema<Campeonato>(
    {
     nombreDiciplinas:{
        type:String,
        required:true
     },
     tamanoEquipos:{
        type:Number,
        required:true
     },
     fechaIniciio:{
        type:String,
        required:true
     },
     fechaFin:{
        type:String,
        required:true
     },
     nombreCampeonato:{
        type:String,
        required:true
     },
     descripcion:{
        type:String,
        required:true
     },
     inicioInscripcion:{
        type:String,
        required:true
     },
     finInscripcion:{
        type:String,
        required:true
     },
     cantidadEquipos:{
        type:Number,
        required:true
     }
},
{
    timestamps: true
}
)

const CampeonatoModel = model("campeonato", CampeonatoShema);

export default CampeonatoModel;