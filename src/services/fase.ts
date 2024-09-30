import mongoose from 'mongoose';
import { Fase } from '../interfaces/fase.interface';
import FaseModel from '../models/fase'
// import ResultadoModel from '../models/resultado';
// import CampeonatoModel from '../models/campeonato';

const insertFase = async (item: Fase) => {
    const Id =new mongoose.Types.ObjectId
    const fase = new FaseModel({
        _id: Id,
        estado: item.estado,
        nombre: item.nombre,
        idCampeonato:item.idCampeonato
    })
    await fase.save()
    return fase;
  };
  
  const getFases = async (id:string) => {
    const responseItem = await FaseModel.find({idCampeonato: id});
    return responseItem;
  };
  const getFasesCampeonato = async (id:string) => {
    const responseItem = await FaseModel.find({idCampeonato: id});
    return responseItem;
    
  };
  
  const getFase = async (id: string) => {
    const responseItem = await FaseModel.findOne({ _id: id });
    return responseItem;
  };
  
  const patchFase = async(id:string, data: Fase)=>{
    try{
      const responseItem = await FaseModel.findOneAndUpdate(
        {_id:id},
        {$push:data},
        {new:true}
      )
      return responseItem;
    }catch(error){
      console.log("Error al hacer path", error);
      throw error;
    }
  }
  const patchFaseEstado = async(id:string, data: Fase)=>{
    try{
      const responseItem = await FaseModel.findOneAndUpdate(
        {_id:id},data,{new:true}
      )
      return responseItem;
    }catch(error){
      console.log("Error al hacer path", error);
      throw error;
    }}
  const deleteFase = async (id: string) => {
    const responseItem = await FaseModel.deleteOne({ _id: id });
    return responseItem;
  };

  const verificarEstadoEquipo = async (idEquipo: string, idCampeonato: string) => {
   
    const fases = await FaseModel.find({ idCampeonato });
  
    if (!fases || fases.length === 0) {
      return { mensaje: "No se encontraron fases para este campeonato." };
    }
  
   
    for (const fase of fases) {
      
      const equiposGanadores = fase.equiposGanadores as any[];
      const equiposPerdedores = fase.equiposPerdedores as any[];
  
     
      const equipoGanador = equiposGanadores.some(
        (equipo) => equipo && equipo._id && equipo._id.toString() === idEquipo
      );
  
     
      const equipoPerdedor = equiposPerdedores.some(
        (equipo) => equipo && equipo._id && equipo._id.toString() === idEquipo
      );
  
     
      if (equipoGanador) {
        return { mensaje: "Tu equipo ha ganado en esta fase.", estado: "ganador" };
      }
  
  
      if (equipoPerdedor) {
        return { mensaje: "Tu equipo ha sido eliminado del campeonato.", estado: "eliminado" };
      }
    }
  
  
    return { mensaje: "El equipo no está registrado en este campeonato.", estado: "no registrado" };
  };
  

export{
  getFasesCampeonato,
    insertFase,
    getFase,
    getFases,
    deleteFase, 
    patchFase,
    patchFaseEstado,
    verificarEstadoEquipo
}
