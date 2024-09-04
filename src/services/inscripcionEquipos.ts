import IncripcionEquiposModel from "../models/InscripcionEquipos";
import { InscripcionEquipos } from "../interfaces/incripcionEquipos.interface";
import JugadorModel from "../models/Jugador";

// const ganadores = async(Idcampeonato:String )=>{
//    const responseItem= await IncripcionEquiposModel.find({Idcampeonato})
//    const ganadores = responseItem.filter((equipo)=> equipo == true)
//    return ganadores
// }

const insertInscripcion = async (data: InscripcionEquipos) => {
  const responseInsert = await IncripcionEquiposModel.create(data);
  return responseInsert;
};

const getInscripcionEquipos = async (IdCampeonato: String) => {
  const responseItem = await IncripcionEquiposModel.find({ IdCampeonato });
  return responseItem;
};

const getEquipo = async (id: string) => {
  const responseItem = await IncripcionEquiposModel.findOne({ cedula: id });
  return responseItem;
};

const updateEstado = async (id: string, data: InscripcionEquipos) => {
  const responseItem = await IncripcionEquiposModel.findOneAndUpdate(
    { _id: id },
    { $set: { ganador: data } }
  );
  return responseItem;
};
const updateTeam = async (id: string, data: InscripcionEquipos) => {
  const responseItem = await IncripcionEquiposModel.findOneAndUpdate(
    { _id: id },
    data,
    {
      new: true,
    }
  );
  return responseItem;
};

const deleteIncripcion = async (id: string) => {
  const equipo = await IncripcionEquiposModel.findById(id);

  if (!equipo) {
    throw new Error("Equipo no encontrado");
  }

  const { cedula } = equipo;

  const responseItem = await IncripcionEquiposModel.deleteOne({ _id: id });

  if (responseItem.deletedCount > 0) {
    await JugadorModel.findOneAndUpdate(
      { identificacion: cedula },
      { esCapitan: false }
    );
  }

  return responseItem;
};

export {
  updateTeam,
  // ganadores,
  insertInscripcion,
  getInscripcionEquipos,
  getEquipo,
  updateEstado,
  deleteIncripcion,
};
