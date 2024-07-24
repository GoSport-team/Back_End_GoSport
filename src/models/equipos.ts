import { Schema, model } from "mongoose";
import { Participantes } from "../interfaces/participantes.interface";
import { Equipo } from "../interfaces/equipos.interface";

const ParticipantesShema = new Schema<Participantes>(
    {
        id:{type: String, unique: true },
        nombreJugador: { type: String, required: true },
        ficha: { type: Number, required: true },
        dorsal: { type: Number, required: true },
    })
const EquiposShema = new Schema<Equipo>(
    {
        nombreEquipo: {
            type: String,
            require: true,
            trim: true
        },
        nombreCapitan: {
            type: String,
            require: true,
            trim: true
        },
        contactoUno: {
            type: Number,
            require: true,
            trim: true
        },
        contactoDos: {
            type: Number,
            require: true,
            trim: true
        },

        jornada: {
            type: String,
            require: true,
            trim: true
        },
<<<<<<< HEAD
     puntos:{
        type: Number,
            trim: true

     },
=======
        cedula:{
            type:String,
            required:false,
            trim:true
        },
>>>>>>> 9a8b60f793a086a18cc9fe68511dce1e52cce294
        estado: {
            type:Boolean,
            required:true,
            default: true 
        },
        participantes:[ParticipantesShema]
    },
    {
        timestamps: true
    }

)


const EquipoModel = model('equipo', EquiposShema )

export default EquipoModel;