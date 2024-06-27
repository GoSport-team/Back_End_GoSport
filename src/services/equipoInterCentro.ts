import EquipoInterCentrosModel from "../models/equipoInterCentros";
import { EquipoInterCentros } from "../interfaces/equipoInterCentro.interface";

const insertEquipoInter = async (data: EquipoInterCentros) => {
    const responseInsert = await EquipoInterCentrosModel.create(data);
    return responseInsert;
  
  };
  
  const obtenerEquiposInter = async (IdCampeonato:String) => {

    const responseItem = await EquipoInterCentrosModel.find({IdCampeonato});
    return responseItem;
  };
  
  const IdEquipoInter = async (id: string) => {
    const responseItem = await  EquipoInterCentrosModel.findOne({ _id: id });
    return responseItem;
  };
  
  const updateEquipoInter = async (id: string, data: EquipoInterCentros) => {
    const responseItem = await EquipoInterCentrosModel.findOneAndUpdate(
        { _id: id }, 
        {$set: {ganador: data}}
    );
    return responseItem;
  };
  
  const deleteEquipoInter = async (id: string) => {
    const responseItem = await EquipoInterCentrosModel.deleteOne({ _id: id });
    return responseItem;
  };


export{
    insertEquipoInter,
    obtenerEquiposInter,
    IdEquipoInter,
    updateEquipoInter,
    deleteEquipoInter
}
