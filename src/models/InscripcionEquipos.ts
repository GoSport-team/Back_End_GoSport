    import { Schema, model } from "mongoose";
import { InscripcionEquipos } from "../interfaces/incripcionEquipos.interface";
import { Participantes } from "../interfaces/participantes.interface";

const ParticipantesShema = new Schema<Participantes>(
    {
        _id:{type:String, require:false},
        nombres: { type: String, required: false },
        ficha: { type: Number, required: false },
        dorsal: { type: Number, required: false },
    })
const IncripcionEquiposShema = new Schema<InscripcionEquipos>(
    {
        nombreEquipo: {
            type: String,   
            required: true,
            trim: true
        },
        nombreCapitan: {
            type: String,
            required: true,
            trim: true
        },
        contactoUno: {
            type: String,
            required: true,
            trim: true
        },
        contactoDos: {
            type: String,
            required: true,
            trim: true
        },
        jornada:{
            type:String,
            required:true,
            trim:true
        },
        puntos:{
            type:Number,
            trim:true,
            required:false
        },
        cedula:{
            type:String,
            required: true,
            trim:true
        },
        imgLogo:{
            type: String,
            required:true,
        },
        idLogo:{
            type:String,
            required:true
        },
        estado:{
            type:Boolean,
            required:true,
            default:false
        },
        participantes:[ParticipantesShema]
    },
    {
        timestamps: true
    }
)


const IncripcionEquiposModel = model('incripcionEquipos', IncripcionEquiposShema )

export default IncripcionEquiposModel;