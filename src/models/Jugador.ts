import { Schema, model } from "mongoose";
import InterfaceJugador from "../interfaces/jugador.interface"

const jugadorSchema = new Schema<InterfaceJugador>({
    jornada :{
        type: String,
        require: true,
        trim:true,
        enum: ['Mañana', 'Tarde', 'Noche']
    },
    numeroFicha:{
        type:Number,
        require: true,
        trim:true
    },
    estado:{
        type: Boolean,
        require: true,
        trim:true,
        default: true
    },
    nombrePrograma:{
        type:String,
        require:true,
        trim:true
    }
})
const modelJugador = model("jugadorSchema", jugadorSchema);
export default modelJugador;