import {Schema, model} from 'mongoose'
import { ResultadoInterCentros } from '../interfaces/resultadosInterCentros.interface'

const ResultadoInterShema = new Schema<ResultadoInterCentros> (
    {
        equipo1:{
            type: Schema.Types.Mixed,
            require: true
        },
        equipo2:{
            type: Schema.Types.Mixed,
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

const ResultadoInterModel = model('resultadosInter', ResultadoInterShema);

export default ResultadoInterModel;