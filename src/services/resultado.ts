import { Resultado } from "../interfaces/resultados";
import ResultadoModel from "../models/resultado";

const insertResultado = async (item: Resultado) => {
    const responseInsert = await ResultadoModel.create(item);
    return responseInsert;
  };
  
  const getResultado = async (IdFase:String) => {
    const responseItem = await ResultadoModel.find({IdFase});
    return responseItem;
  };
  
  // falta length Resultados Vs 

  const updateResultado = async (id: string, data: Resultado) => {
    const responseItem = await ResultadoModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    return responseItem;
  };
  
  const deleteResultado = async (id: string) => {
    const responseItem = await ResultadoModel.deleteOne({ _id: id });
    return responseItem;
  };

export{
    insertResultado,
    getResultado,
    updateResultado,
    deleteResultado
}
