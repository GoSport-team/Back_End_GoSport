import { Schema, model,} from "mongoose";

import { Fase } from "../interfaces/fase.interface";

const FaseShema = new Schema<Fase>(
    {
        estado:{
            type: String,
            required: true
        },
        nombre:{
            type: String,
            require:true
        }
    },
    {
        timestamps: true
    }
)

const FaseModel = model('fase', FaseShema)

export default FaseModel;