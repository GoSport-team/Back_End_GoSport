import { Schema } from "mongoose";
import UsuarioModel from "./usuario";

const CapitanModel = UsuarioModel.discriminator("Capitan", new Schema({}));
export default CapitanModel;
