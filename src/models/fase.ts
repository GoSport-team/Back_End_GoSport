
import { Schema, model,} from "mongoose";

import { Fase } from "../interfaces/fase.interface";

const FaseShema = new Schema<Fase>(
    {
        estado:{
            type:Boolean,
            required: true
        },
        nombre:{
            type: Number,
            require:true
        },
        idCampeonato:{
            type: String,
            require:true 
        },
        equiposGanadores:[{
            type: Schema.Types.Mixed,
    
        }],
        equiposPerdedores:[{
            type: Schema.Types.Mixed,
        
        }]
            
      
    },
    {
        timestamps: true
    }
)

const FaseModel = model('fase', FaseShema)

export default FaseModel;