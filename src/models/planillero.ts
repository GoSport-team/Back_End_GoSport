import { Schema } from "mongoose";
import UsuarioModel from "./usuario";

const PlanilleroModel = UsuarioModel.discriminator(
  "Planillero",
  new Schema({})
);
export default PlanilleroModel;