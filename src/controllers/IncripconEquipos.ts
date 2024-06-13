import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
    insertInscripcion,
    getEquipo,
    getInscripcionEquipos,
    updateIncripcion,
    deleteIncripcion
} from '../services/inscripcionEquipos'

 
const obtenerInscripcionesEquipos = async ({headers}: Request, res: Response) => {
    try {
      const {IdCampeonato} = headers
      const response = await getInscripcionEquipos(`${IdCampeonato}`);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL OBTENER LOS EQUIPOS INSCRITOS");
    }
  };
  const obtenerInscripcionEquipo = async ({ params }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await getEquipo(id);
      const data = response ? response : "EQUIPO NO ENCONTRADO";
      res.send(data)
    } catch (e) {
      handleHttp(res, "ERROR AL OBTENER EL EQUIPO");
    }
  };
  
  
  const actualizaEquipo = async ({ params, body }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await updateIncripcion(id, body);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ACTUALIZAR EL EQUIPO");
    }
  };
  
  const guardarInscripcionDeEquipo = async ({ body }: Request, res: Response) => {
    try {
      const responseItem = await insertInscripcion(body);
      res.send(responseItem);
    } catch (e) {
      handleHttp(res, "ERROR AL GUARDAR EL EQUIPO", e);
    }
  };
  
  const eliminarEquipo= async ({ params }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await deleteIncripcion(id);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ELIMINAR EL RESULTADO");
    }
  };


export{
    obtenerInscripcionesEquipos,
    obtenerInscripcionEquipo,
    guardarInscripcionDeEquipo,
    actualizaEquipo,
    eliminarEquipo
}