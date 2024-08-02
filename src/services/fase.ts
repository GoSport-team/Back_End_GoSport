import mongoose from 'mongoose';
import { Fase } from '../interfaces/fase.interface';
import FaseModel from '../models/fase'

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
  
  const getFases = async () => {
    const responseItem = await FaseModel.find({});
    return responseItem;
  };
  const getFasesCampeonato = async (id:string) => {
    const responseItem = await FaseModel.findOne({idCampeonato: id});
    console.log(responseItem)
    return responseItem;
    
  };
  
  const getFase = async (id: string) => {
    const responseItem = await FaseModel.findOne({ _id: id });
    return responseItem;
  };
  
  const updateFase = async (id: string, data: Fase) => {
    const responseItem = await FaseModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    return responseItem;
  };
  
  const patchFase = async(id:string, data: Fase)=>{
    try{
      const responseItem = await FaseModel.findOneAndUpdate({_id:id},
        {$set:data},
        {new:true}
      )
      return responseItem;
    }
    catch(error){
      console.log("Error al hacer path", error);
      throw error;
    }

  }

  const deleteFase = async (id: string) => {
    const responseItem = await FaseModel.deleteOne({ _id: id });
    return responseItem;
  };
  

export{
  getFasesCampeonato,
    insertFase,
    getFase,
    getFases,
    updateFase,
    deleteFase, 
    patchFase
}
