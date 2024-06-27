import { Schema, model } from "mongoose";
import { EquipoInterCentros } from "../interfaces/equipoInterCentro.interface";
import { ParticipantesInterCentros } from "../interfaces/participantesInterCentros.interface";

const ParticipantesInterShema = new Schema<ParticipantesInterCentros>(
    {
        N: { type: Number, required: true },
        nombreJugador: { type: String, required: true },
        ficha: { type: Number, required: true },
        dorsal: { type: Number, required: true },
    })
const EquiposInterCentrosShema = new Schema<EquipoInterCentros>(
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
        Idcampeonato:{
            type: String,
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
            require: true,
            trim: true
        },
        ganador: {
            type:Boolean,
            required:true,
            default: true 
        },
        participantes:[ParticipantesInterShema]
    },
    {
        timestamps: true
    }

)


const EquipoInterCentrosModel = model('equipoInterCentro', EquiposInterCentrosShema )

export default EquipoInterCentrosModel;