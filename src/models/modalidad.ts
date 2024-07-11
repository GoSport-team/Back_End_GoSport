import { Schema, model } from "mongoose";
import { Modalidad } from "../interfaces/modalidad.interface";

const ModalidadSchema = new Schema<Modalidad>(
   {
      nombreModalidad: {
         type: String,
         required: true
      },
      tamanoEquipos: {
         type: Number,
         required: true
      },
      fechaInicio: {
         type: String,
         required: true
      },
      fechaFin: {
         type: String,
         required: true
      },
      nombreCampeonato: {
         type: String,
         required: true
      },
      descripcion: {
         type: String,
         required: true
      },
      inicioInscripcion: {
         type: String,
         required: true
      },
      finInscripcion: {
         type: String,
         required: true
      },
      cantidadEquipos: {
         type: Number,
         required: true
      }
   },
   {
      timestamps: true
   }
);

const ModalidadModel = model("modalidad", ModalidadSchema);

export default ModalidadModel;
