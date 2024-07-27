import { Schema, model } from "mongoose";
import { Disciplina } from "../interfaces/disciplina.interface"

const DisciplinaSchema = new Schema<Disciplina>(
    {
        nombreDisciplina: {
            type: String,
        },
    }
);

const DisciplinaModel = model("Disciplina", DisciplinaSchema);

export default DisciplinaModel;