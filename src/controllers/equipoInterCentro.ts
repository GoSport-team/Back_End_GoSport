import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
    insertEquipoInter,
    obtenerEquiposInter,
    IdEquipoInter,
    updateEquipoInter,
    deleteEquipoInter
} from '../services/equipoInterCentro'

 
const obtenerEquiposInterCentro = async ({headers}: Request, res: Response) => {
    try {
      const {IdCampeonato} = headers
      const response = await obtenerEquiposInter(`${IdCampeonato}`);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL OBTENER LOS EQUIPOS INSCRITOS");
    }
  };
  const obtenerEquipoInter = async ({ params }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await IdEquipoInter(id);
      const data = response ? response : "EQUIPO NO ENCONTRADO";
      res.send(data)
    } catch (e) {
      handleHttp(res, "ERROR AL OBTENER EL EQUIPO");
    }
  };
  
  
  const actualizaEquipo = async ({ params, body }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await updateEquipoInter(id, body);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ACTUALIZAR EL EQUIPO");
    }
  };
  
  const guardarEquipoInter = async ({ body }: Request, res: Response) => {
    try {
      const responseItem = await insertEquipoInter(body);
      res.send(responseItem);
    } catch (e) {
      handleHttp(res, "ERROR AL GUARDAR EL EQUIPO", e);
    }
  };
  
  const eliminarEquipoInter= async ({ params }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await deleteEquipoInter(id);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ELIMINAR EL RESULTADO");
    }
  };


export{
  obtenerEquiposInterCentro,
    obtenerEquipoInter,
    guardarEquipoInter,
    actualizaEquipo,
    eliminarEquipoInter
}