import { Schema, model } from "mongoose";
import { InscripcionEquipos } from "../interfaces/incripcionEquipos.interface";
import { Participantes } from "../interfaces/participantes.interface";

const ParticipantesShema = new Schema<Participantes>(
    {
        nombreJugador: { type: String, required: false },
        ficha: { type: String, required: false },
        dorsal: { type: Number, required: false },
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
            type: String,
            require: true,
            trim: true,
            unique:true
        },
        contactoDos: {
            type: String,
            require: true,
            trim: true,
            unique:true
        },
        cedula:{
            type:String,
            require: true,
            trim:true
        },
        imgLogo:{
            type: String,
            required:true,
        },
        participantes:[ParticipantesShema]
    },
    {
        timestamps: true
    }
)


const IncripcionEquiposModel = model('incripcionEquipos', IncripcionEquiposShema )

export default IncripcionEquiposModel;