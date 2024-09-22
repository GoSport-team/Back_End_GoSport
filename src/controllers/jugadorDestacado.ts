import { Request, Response } from "express";
import {
  agregarJugadorDestacado,
  obtenerJugadoresDestacados,
} from "../services/jugadorDestacado";
import UsuarioModel from "../models/usuario";
import jugadorDestacdoModel from "../models/jugadorDestacado";

const insertJugadorDestacado = async (req: Request, res: Response) => {
  try {
    const { jugadorDestacado } = req.body;

    if (
      !jugadorDestacado ||
      !Array.isArray(jugadorDestacado) ||
      jugadorDestacado.length === 0
    ) {
      return res
        .status(400)
        .send({ msg: "Faltan datos requeridos o formato incorrecto" });
    }

    const usuarios = await UsuarioModel.find({
      _id: { $in: jugadorDestacado },
    });

    if (usuarios.length === 0) {
      return res.status(404).send({ msg: "No se encontraron usuarios" });
    }

    for (const jugador of usuarios) {
      const jugadorExistente = await jugadorDestacdoModel.findOne({
        "jugadorDestacado._id": jugador._id,
        isSelected: true,
      });

      if (jugadorExistente) {
        return res.status(400).send({
          msg: `El jugador ${jugador.nombres} ya está seleccionado como destacado`,
        });
      }
    }

    const nuevoJugador = await agregarJugadorDestacado({
      jugadorDestacado: usuarios,
      isSelected: true,
    });
    res.status(201).send({
      msg: "Jugador destacado guardado correctamente",
      jugador: nuevoJugador,
    });
  } catch (e) {
    res.status(500).send({
      msg: "ERROR AL GUARDAR EL JUGADOR",
      error: e instanceof Error ? e.message : "ERROR DESCONOCIDO",
    });
  }
  return;
};

const getJugadoresDestacados = async (_req: Request, res: Response) => {
  try {
    const jugadoresDestacados = await obtenerJugadoresDestacados();
    res.send(jugadoresDestacados);
  } catch (e) {
    res.status(500).send({
      msg: "ERROR AL OBTENER JUGADORES DESTACADOS",
      error: e instanceof Error ? e.message : "ERROR DESCONOCIDO",
    });
  }
};

const deleteJugadorDestacado = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const jugador = await jugadorDestacdoModel.findById(id);
    if (!jugador) {
      return res.status(404).send({
        msg: "El jugador destacado no fue encontrado o ya fue eliminado",
      });
    }

    await jugadorDestacdoModel.findByIdAndDelete(id);
    res.status(200).send({ msg: "Jugador destacado eliminado correctamente" });
  } catch (e) {
    res.status(500).send({
      msg: "Error al eliminar el jugador destacado",
      error: e instanceof Error ? e.message : "Error desconocido",
    });
  }
  return;
};

export {
  insertJugadorDestacado,
  deleteJugadorDestacado,
  getJugadoresDestacados,
};
