import { posicionesIntercentros } from "../interfaces/posicionesIntercentros.interface";
import PosicionesIntercentros from "../models/posicionesIntercentros";



export const insertPosicionesInterCentro = async (item: posicionesIntercentros) => {
    const responseInsert = await    PosicionesIntercentros.create(item);
    return responseInsert;
  };
  
 export const getPosicionesInter = async (idCampeonato:String) => {
    const responseItem = await PosicionesIntercentros.find({idCampeonato});
    return responseItem;
  };
  
  export const getPosicionInter = async (idEquipo:String) => {
    const responseItem = await PosicionesIntercentros.find({'equipo._id':idEquipo});
    return responseItem;
  };

 export const updatePosicionesInter = async (id: string, data: posicionesIntercentros) => {
    const responseItem = await PosicionesIntercentros.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    return responseItem;
  };
  

