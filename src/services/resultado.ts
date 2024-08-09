  import { Resultado } from "../interfaces/resultados";
import ResultadoModel from "../models/resultado";
import VSModel from "../models/vs";

const seguirDeFase = async(IdFase:String)=>{

  const resultado = await ResultadoModel.find({IdFase})
  const vs = await VSModel.find({IdFase})

  if (resultado.length == vs.length){
    return {estadoFase:false}
  }else{
    return {estadoFase:true}
  }
}
const insertResultado = async (item: Resultado) => {
    const responseInsert = await ResultadoModel.create(item);
    return responseInsert;
  };
  const getResult = async (id: string) => {
    const responseItem = await ResultadoModel.findOne({ IdVs: id });
    return responseItem;
  };
  const getResultado = async (idfase:String) => {
    const responseItem = await ResultadoModel.find({IdFase : idfase});
    return responseItem;
  };
  
  

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
  seguirDeFase,
    insertResultado,
    getResultado,
    updateResultado,
    deleteResultado,
    getResult
}
