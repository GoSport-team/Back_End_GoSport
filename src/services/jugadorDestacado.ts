import { JugadorDestacado } from "../interfaces/jugadorDestacado";
import jugadorDestacdoModel from "../models/jugadorDestacado";

const agregarJugadorDestacado = async (data: JugadorDestacado) => {
  const nuevoJugadorDestacado = new jugadorDestacdoModel(data);
  return await nuevoJugadorDestacado.save();
};

const obtenerJugadoresDestacados = async () => {
  return await jugadorDestacdoModel.find().populate("jugadorDestacado");
};

const eliminarJugadorDestacado = async (id: string) => {
  const jugadorEliminado = await jugadorDestacdoModel.findOneAndUpdate(
    { "jugadorDestacado._id": id, isSelected: true },
    { $set: { isSelected: false } },
    { new: true }
  );

  return jugadorEliminado;
};

export {
  agregarJugadorDestacado,
  eliminarJugadorDestacado,
  obtenerJugadoresDestacados,
};
