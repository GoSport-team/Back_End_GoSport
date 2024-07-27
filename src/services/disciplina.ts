import { Disciplina } from "../interfaces/disciplina.interface"; 
import DisciplinaModel from "../models/disciplina"; 

const insertDisciplina = async (item: Disciplina) => {
    const responseInsert = await DisciplinaModel.create(item);
    return responseInsert;
};

const getDisciplinas = async () => {
    const responseItems = await DisciplinaModel.find({});
    return responseItems;
};

const getDisciplina = async (id: string) => {
    const responseItem = await DisciplinaModel.findOne({ _id: id });
    return responseItem;
};



export { insertDisciplina, getDisciplinas, getDisciplina };