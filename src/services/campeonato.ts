import { Campeonato } from "../interfaces/campeonato.infertace";
import CampeonatoModel from "../models/campeonato";

const insertCampeonato = async (item: Campeonato) => {
  
    const responseInsert = await CampeonatoModel.create(item);
    return responseInsert;
  };
  
  const getCampeonatos = async () => {
    const responseItem = await CampeonatoModel.find({});
    return responseItem;
  };
  
  const getCampeonato = async (id: string) => {
    const responseItem = await CampeonatoModel.findOne({ _id: id });
    return responseItem;
  };
  
  const updateCampeonato = async (id: string, data: Campeonato) => {
    const responseItem = await CampeonatoModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    return responseItem;
  };
  
  const deleteCampeonato = async (id: string) => {
    const responseItem = await CampeonatoModel.deleteOne({ _id: id });
    return responseItem;
  };

  const obtenerDetalleCampeonato = async (id: string): Promise<Campeonato | null> => {
    const campeonato = await getCampeonato(id);
    if (!campeonato) {
        throw new Error('Campeonato no encontrado');
    }
    return campeonato;
};
  
export {insertCampeonato, getCampeonatos,getCampeonato,updateCampeonato, deleteCampeonato, obtenerDetalleCampeonato }