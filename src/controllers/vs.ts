import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";

import {
    insertVS,
    getVS,
    getVS1,
    updateVS,
    deleteVS,
    patchVs
} from '../services/vs'


const obtenerVS = async ({headers}: Request, res: Response) => {
    try {
      const {IdFase} = headers
      const response = await getVS(`${IdFase}`);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL OBTENER LOS RESULTADOS");
    }
  };

  const obtenerVS1 = async ({params}: Request, res: Response) => {
    try {
      const {id} = params
      const response = await getVS1(`${id}`);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL OBTENER LOS RESULTADOS");
    }
  };
  
  const actualizarVS = async ({ params, body }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await updateVS(id, body);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ACTUALIZAR EL RESULTADOS");
    }
  };

  const patchesVs = async({params, body}:Request, res:Response)=>{
    try {
      const { id } = params;
      const response = await patchVs(id, body);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ACTUALIZAR EL RESULTADOS");
    }
  }
  
  const guardarVS = async ({ body }: Request, res: Response) => {
    try {
     const {equipos} = body.data.equipos
     const {IdFase} = body.data.IdFase
      const responseItem = await insertVS(equipos, IdFase);
      res.send(responseItem);
    } catch (e) {
      handleHttp(res, "ERROR AL GUARDAR LOS RESULTADOS", e);
    }
  };
  
  const eliminarVS = async ({ params }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await deleteVS(id);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ELIMINAR EL RESULTADO");
    }
  };

export{
    obtenerVS,
    obtenerVS1,
    guardarVS,
    actualizarVS,
    eliminarVS,
    patchesVs
}