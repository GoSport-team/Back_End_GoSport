import { Schema, model } from 'mongoose'
import { Programa } from '../interfaces/programas'

const ProgramaShema = new Schema<Programa>(
    {
        namePrograma: {
            type: String,
            required: true
        }
    }
)

const ProgramaModel = model('programa', ProgramaShema)
export default ProgramaModel;