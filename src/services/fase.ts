import mongoose from 'mongoose';
import { Fase } from '../interfaces/fase.interface';
import FaseModel from '../models/fase'

const insertFase = async (item: Fase) => {
    const Id =new mongoose.Types.ObjectId
    const fase = new FaseModel({
        _id: Id,
        estado: item.estado,
        nombre: item.nombre
    })
    await fase.save()
    return fase;
  };
  
  const getFases = async () => {
    const responseItem = await FaseModel.find({});
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
  
  const deleteFase = async (id: string) => {
    const responseItem = await FaseModel.deleteOne({ _id: id });
    return responseItem;
  };
  

export{
    insertFase,
    getFase,
    getFases,
    updateFase,
    deleteFase
}
