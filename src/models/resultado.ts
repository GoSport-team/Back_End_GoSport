import {Schema, model} from 'mongoose'
import { Resultado } from '../interfaces/resultados'

const ResultadoShema = new Schema<Resultado> (
    {
        equipo1:{
            type: Schema.Types.Mixed,
            required: true
        },
        equipo2:{
            type: Schema.Types.Mixed,
            required: true
        },
        IdVs:{
            type: String,
            required: true
        },
        IdFase:{
            type: String,
            required: false
        },
        estadoPartido:{
            type: Boolean,
            required: true
            
        },idPlanillero:{
            type: String,
            required: false
        },
        idCampeonato:{
            type: String,
            required: true
        },
        penales:{
            type: Boolean,
            required: true  
        },
        numeroTiros:{
            type: String,
            required:false
        }
        
        // idCampeonato:{
        //     type: String,
        //     required: true
        // }
    },
{
    timestamps: true
})

const ResultadoModel = model('resultados', ResultadoShema);

export default ResultadoModel;