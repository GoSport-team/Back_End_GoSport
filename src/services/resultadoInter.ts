import { ResultadoInterCentros } from "../interfaces/resultadosInterCentros.interface";
import ResultadoInterModel from "../models/resultadoInterCentros";

const insertResultadoInterCentro = async (item: ResultadoInterCentros) => {
    const responseInsert = await ResultadoInterModel.create(item);
    return responseInsert;
  };
  
  const getResultadoInter = async (IdFase:String) => {
    const responseItem = await ResultadoInterModel.find({IdFase});
    return responseItem;
  };
  
  // falta length Resultados Vs 

  const updateResultadoInter = async (id: string, data: ResultadoInterCentros) => {
    const responseItem = await ResultadoInterModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    return responseItem;
  };
  
  const deleteResultadoInter = async (id: string) => {
    const responseItem = await ResultadoInterModel.deleteOne({ _id: id });
    return responseItem;
  };

export{
    insertResultadoInterCentro,
    getResultadoInter,
    updateResultadoInter,
    deleteResultadoInter
}
