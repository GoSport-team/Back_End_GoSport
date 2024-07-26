import { Schema, model } from "mongoose";

import { Equipo } from "../interfaces/equipos.interface";

const ParticipantesShema = new Schema(
    {
        nombreJugador: { type: String, required: true },
        ficha: { type: String, required: true },
<<<<<<< HEAD
        dorsal: { type: Number, required: true },
=======
        dorsal: { type: String, required: true },
>>>>>>> 005dd048952410a4ef667d4b80d5b5d9c80df77e
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
>>>>>>> 005dd048952410a4ef667d4b80d5b5d9c80df77e
        cedula:{
            type:String,
            required:false,
            trim:true
        },
<<<<<<< HEAD
=======
     puntos:{
        type: Number,
        trim: true,
        required:false
     },
        imgLogo:{
            type: String,
            required:true,
        },
>>>>>>> 005dd048952410a4ef667d4b80d5b5d9c80df77e
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