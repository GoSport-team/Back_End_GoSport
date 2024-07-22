import { Schema, model } from "mongoose";
import {EquiposInscriptos} from '../interfaces/equipoInscriptos.interface'

const EquipoInscriptoShema = new Schema<EquiposInscriptos>(
    {
       idEquipo: {
          type: String,
          required: true
       },
       idCampeonato: {
          type: String,
          required: true
       }
    },
    {
       timestamps: true
    }
 )
 
 const EquiposInscriptosModel = model("equiposInscriptos", EquipoInscriptoShema);
 
 export default EquiposInscriptosModel;