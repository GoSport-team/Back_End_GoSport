import { Schema, model } from "mongoose";

import { Equipo } from "../interfaces/equipos.interface";

const ParticipantesShema = new Schema(
    {   
        _id:{type:String, require:true},
        nombres: { type: String, required: true },
        ficha: { type: String, required: true },
        dorsal: { type: String, required: true },
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
     puntos:{
        type: Number,
            trim: true
     },
        cedula:{
            type:String,
             required:false,
            trim:true
        },
     
        imgLogo:{
            type: String,
            required:true,
        },
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