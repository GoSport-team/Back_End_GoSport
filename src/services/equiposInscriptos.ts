import { EquiposInscriptos } from "../interfaces/equipoInscriptos.interface";
import EquiposInscriptosModel from "../models/equiposInscriptos";
import { InscripcionEquipos } from "../interfaces/incripcionEquipos.interface";
const insertEquipoInscripto = async (item: EquiposInscriptos) => {
    const responseInsert = await EquiposInscriptosModel.create(item);
    return responseInsert;
  };
  

  const validarInscripcionIntegrante = async (id:String, idJugador:String)=>{
    const equipos = await EquiposInscriptosModel.find({idCampeonato:id})
   
    
    const jugadorYaInscrito = equipos.some((Equipo) =>
      (Equipo.Equipo as InscripcionEquipos).participantes.some((participante: any) => participante._id === idJugador)
  );
  
  console.log(jugadorYaInscrito)

    //const existeJugador = equipos.filter((item)=> item.Equipo.participantes._id == idJugador)
    return jugadorYaInscrito
  }

  const getEquiposInscriptos  = async (id: String ) => {
    const responseItem = await EquiposInscriptosModel.find({idCampeonato : id});
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
  
export {validarInscripcionIntegrante,insertEquipoInscripto, getEquiposInscriptos,getEquitoInscripto,updateEquipoInscripto, deleteEquipoInscripto }