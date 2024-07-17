import EquipoModel from "../models/equipos"
import { Equipo } from "../interfaces/equipos.interface"

 export const insertEquipo = async (data: Equipo) => {
    const responseInsert = await EquipoModel.create(data);
    return responseInsert;
  
  }
  export const obtenerEquipos = async () => {
    const responseItem = await EquipoModel.find({});
    return responseItem;
  };

  export   const IdEquipo = async (id: string) => {
    const responseItem = await  EquipoModel.findOne({ _id: id });
    return responseItem;
  };
  export const updateEquipo = async (id: string, data: Equipo) => {
    const responseItem = await EquipoModel.findOneAndUpdate(
        { _id: id }, 
        {$set: {ganador: data}}
    );
    return responseItem;
  };
  export const deleteEquipo = async (id: string) => {
    const responseItem = await EquipoModel.deleteOne({ _id: id });
    return responseItem;
  };
