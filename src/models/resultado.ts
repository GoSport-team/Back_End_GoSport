import {Schema, model} from 'mongoose'
import { Resultado } from '../interfaces/resultados'

const ResultadoShema = new Schema<Resultado> (
    {
        equipo1:{
            type: Schema.Types.Mixed,
            require: true
        },
        equipo2:{
            type: Schema.Types.Mixed,
            require: true
        },
        IdVs:{
            type: String,
            require: true
        },
        IdFase:{
            type: String,
            require: true
        },
        estadoPartido:{
            type: Boolean,
            require: true
        }
    },
{
    timestamps: true
})

const ResultadoModel = model('resultados', ResultadoShema);

export default ResultadoModel;