import { Schema, model } from "mongoose";
import InterfaceJugador from "../interfaces/jugador.interface"

const jugadorSchema = new Schema<InterfaceJugador>({
    nombres:{
        type:String,
        require:true,
        trim:true
    },
    correo:{
        type:String,
        require:true,
        trim:true
    },
    telefono:{
        type:Number,
        require:true,
        trim:true
    
    },
    genero:{
          type:String,
        require:true,
        trim:true,
        enum:['Femenino','Masculino','Mixto']

    },
    urlFoto:{ 
          type:String,
        require:true,
        trim:true
    },
    identificacion:{
        type:String,
        require:true,
        trim:true
    
    },
    contrasena:{
        type:String,
        require:true,
        trim:true
    },
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