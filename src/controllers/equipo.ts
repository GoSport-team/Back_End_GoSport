import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import{
    insertEquipo,
    obtenerEquipos,
    IdEquipo,
    updateEquipo,
    deleteEquipo
}from '../services/equipo'

export const ObtenerEquipos = async (_req: Request, res: Response) => {
    try {
      const response = await obtenerEquipos();
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL OBTENER LOS EQUIPOS INSCRITOS");
    }
  };
  export const obtenerEquipo = async ({ params }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await IdEquipo(id);
      const data = response ? response : "EQUIPO NO ENCONTRADO";
      res.send(data)
    } catch (e) {
      handleHttp(res, "ERROR AL OBTENER EL EQUIPO");
    }
  };
  export const actualizaEquipo = async ({ params, body }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await updateEquipo(id, body);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ACTUALIZAR EL EQUIPO");
    }
  };
  export const guardarEquipo = async ({ body }: Request, res: Response) => {
    try {
      // console.log(body)
      const responseItem = await insertEquipo(body);
      res.send(responseItem);
    } catch (e) {
      handleHttp(res, "ERROR AL GUARDAR EL EQUIPO", e);
    }
  };
  export  const eliminarEquipo= async ({ params }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await deleteEquipo(id);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ELIMINAR EL RESULTADO");
    }
  };
  