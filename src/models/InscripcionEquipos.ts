import { Schema, model } from "mongoose";
import { InscripcionEquipos } from "../interfaces/incripcionEquipos.interface";
import { Participantes } from "../interfaces/participantes.interface";

const ParticipantesShema = new Schema<Participantes>(
    {
        N: { type: Number, required: true },
        nombreJugador: { type: String, required: true },
        ficha: { type: Number, required: true },
        dorsal: { type: Number, required: true },
    })
const IncripcionEquiposShema = new Schema<InscripcionEquipos>(
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
        IdCampeonato:{
            type: String,
            require: true,
            trim: true
        },
        ganador: {
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


const IncripcionEquiposModel = model('incripcionEquipos', IncripcionEquiposShema )

export default IncripcionEquiposModel;