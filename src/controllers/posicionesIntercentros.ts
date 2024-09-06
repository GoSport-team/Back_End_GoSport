import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { getPosicionInter, getPosicionesInter, insertPosicionesInterCentro, updatePosicionesInter } from "../services/posicionesIntercentros";


export const obtenerPosicionesInter= async ({headers}: Request, res: Response) => {
    try {
      const {idcampeonato} = headers
      const response = await getPosicionesInter(`${idcampeonato}`);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL OBTENER LOS RESULTADOS");
    }
  }

  export const obtenerPosicionInter= async ({params}: Request, res: Response) => {
    try {
      const {id} = params
      const response = await getPosicionInter(`${id}`);
      res.send(response[0]);
    } catch (e) {
      handleHttp(res, "ERROR AL OBTENER LOS RESULTADOS");
    }
  }
export  const actualizarPosicionesInter = async ({ params, body }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await updatePosicionesInter(id, body);
      res.send({response, msg:'actualizado Correctamente'});
    } catch (e) {
      handleHttp(res, "ERROR AL ACTUALIZAR EL RESULTADOS");
    }
  };
export const guardarPosicionesInter = async ({ body }: Request, res: Response) => {
    try {
     const data = body
      const responseItem = await insertPosicionesInterCentro(data);
      if(responseItem){
        res.json({msg:"Resultado guardado correctamente"});
      }
    } catch (e) {
      handleHttp(res, "ERROR AL GUARDAR LOS RESULTADOS", e);
    }
  };