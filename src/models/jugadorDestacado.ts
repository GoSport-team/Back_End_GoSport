import { Schema , model } from "mongoose";
import {JugadorDestacado} from'../interfaces/jugadorDestacado'
// import UsuarioModel from "../models/usuario";
const JugadorDestacadoSchema = new Schema<JugadorDestacado>(
    {
        jugadorDestacado:[{
            type: Schema.Types.Mixed,
            required: true
        }]
    }
)
const jugadorDestacdoModel = model('jugadorDestacado',JugadorDestacadoSchema);
export default jugadorDestacdoModel;