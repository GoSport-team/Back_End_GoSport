import { Schema, model } from "mongoose";
import { Campeonato } from "../interfaces/campeonato.infertace";

const CampeonatoShema = new Schema<Campeonato>(
   {
      nombreDiciplinas: {
         type: String,
         required: true,
         trim:true
      },
      estadoCampeonato:{
         type:String,
         required:true,
         trim:true,
         enum:["Creado", "Inscripcion", "RegistroFecha", "Ejecucion", "Finalizacion"]
      },
      tamanoEquipos: {
         type: Number,
         required: true,
         trim:true
      },
      fechaInicio: {
         type: String,
         required: true,
         trim:true
      },
      fechaFin: {
         type: String,
         required: true,
         trim:true
      },
      tipoCampeonato:{
         type: String,
         required:true,
         trim:true,
         enum:["InterCentros", "InterFichas", "Recreacional"]
      },
      nombreCampeonato: {
         type: String,
         required: true,
         trim:true
      },
      descripcion: {
         type: String,
         required: true,
         trim:true
      },
      inicioInscripcion: {
         type: String,
         required: true,
         trim:true
      },
      finInscripcion: {
         type: String,
         required: true,
         trim:true
      },
      añoCreacion:{
         type:Number,
         required:true,
         trim:true
      }
   },
   {
      timestamps: true
   }
)

const CampeonatoModel = model("campeonato", CampeonatoShema);

export default CampeonatoModel;