import { EquiposInscriptos } from "../interfaces/equipoInscriptos.interface";
import EquiposInscriptosModel from "../models/equiposInscriptos";

const insertEquipoInscripto = async (item: EquiposInscriptos) => {
    const responseInsert = await EquiposInscriptosModel.create(item);
    return responseInsert;
  };
  
  const getEquiposInscriptos  = async () => {
    const responseItem = await EquiposInscriptosModel.find({});
    return responseItem;
  };
  
  const getEquitoInscripto = async (id: string) => {
    const responseItem = await EquiposInscriptosModel.findOne({ _id: id });
    return responseItem;
  };
  
  

  const updateEquipoInscripto = async (id: string, data: EquiposInscriptos) => {
    const responseItem = await EquiposInscriptosModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    return responseItem;
  };
  
  const deleteEquipoInscripto = async (id: string) => {
    const responseItem = await EquiposInscriptosModel.deleteOne({ _id: id });
    return responseItem;
  };
  
export {insertEquipoInscripto, getEquiposInscriptos,getEquitoInscripto,updateEquipoInscripto, deleteEquipoInscripto }