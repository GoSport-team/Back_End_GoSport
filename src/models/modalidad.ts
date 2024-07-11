import { Schema, model } from "mongoose";
import { Modalidad } from "../interfaces/modalidad.interface";

const ModalidadSchema = new Schema<Modalidad>(
   {
      nombreModalidad: {
         type: String,
         required: true
      },

   }
);

const ModalidadModel = model("modalidad", ModalidadSchema);

export default ModalidadModel;
