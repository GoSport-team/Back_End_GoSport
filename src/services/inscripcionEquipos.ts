import IncripcionEquiposModel from "../models/InscripcionEquipos";
import { InscripcionEquipos } from "../interfaces/incripcionEquipos.interface";

const insertInscripcion = async (data: InscripcionEquipos) => {
    const responseInsert = await IncripcionEquiposModel.create(data);
    return responseInsert;
  };
  
  const getInscripcionEquipos = async (IdCampeonato:String) => {

    const responseItem = await IncripcionEquiposModel.find({IdCampeonato});
    return responseItem;
  };
  
  const getEquipo = async (id: string) => {
    const responseItem = await  IncripcionEquiposModel.findOne({ _id: id });
    return responseItem;
  };
  
  const updateIncripcion = async (id: string, data: InscripcionEquipos) => {
    const responseItem = await IncripcionEquiposModel.findOneAndUpdate(
        { _id: id }, 
        {$set: {ganador: data}}
    );
    return responseItem;
  };
  
  const deleteIncripcion = async (id: string) => {
    const responseItem = await IncripcionEquiposModel.deleteOne({ _id: id });
    return responseItem;
  };


export{
    insertInscripcion,
    getInscripcionEquipos,
    getEquipo,
    updateIncripcion,
    deleteIncripcion
}
