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
<<<<<<< HEAD
        idCampeonato:{
            type: String,
            required: true
        },
        penales:{
            type: Boolean,
            required: true  
        }
        
=======
        // idCampeonato:{
        //     type: String,
        //     required: true
        // }
>>>>>>> 054c0d74076c621ad73d6c15d621aef121abbc9f
    },
{
    timestamps: true
})

const ResultadoModel = model('resultados', ResultadoShema);

export default ResultadoModel;