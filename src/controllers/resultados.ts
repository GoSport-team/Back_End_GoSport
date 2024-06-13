import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
    insertResultado,
    getResultado,
    updateResultado,
    deleteResultado
} from '../services/resultado'

 
  const obtenerResultados = async ({headers}: Request, res: Response) => {
    try {
      const {IdFase} = headers
      const response = await getResultado(`${IdFase}`);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL OBTENER LOS RESULTADOS");
    }
  };
  
  const actualizarResultado = async ({ params, body }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await updateResultado(id, body);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ACTUALIZAR EL RESULTADOS");
    }
  };
  
  const guardarResultado = async ({ body }: Request, res: Response) => {
    try {
      const responseItem = await insertResultado(body);
      res.send(responseItem);
    } catch (e) {
      handleHttp(res, "ERROR AL GUARDAR LOS RESULTADOS", e);
    }
  };
  
  const eliminarResultado= async ({ params }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await deleteResultado(id);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ELIMINAR EL RESULTADO");
    }
  };


export {
    obtenerResultados,
    actualizarResultado,
    guardarResultado,
    eliminarResultado
    
}
