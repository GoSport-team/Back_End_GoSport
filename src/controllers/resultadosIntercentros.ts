import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { deleteResultadoInter, getResultadoInter, getResultadoInterId, insertResultadoInterCentro, updateResultadoInter } from "../services/resultadoInter";


const obtenerResultadosInter= async ({headers}: Request, res: Response) => {
    try {
      const {idcampeonato} = headers
      const response = await getResultadoInter(`${idcampeonato}`);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL OBTENER LOS RESULTADOS");
    }
  }
  const obtenerResultado1Inter = async ({params}: Request, res: Response) => {
    try {
      const {id} = params 
      const response = await getResultadoInterId(`${id}`);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL OBTENER LOS RESULTADOS");
    }
  };
  const actualizarResultadoInter = async ({ params, body }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await updateResultadoInter(id, body);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ACTUALIZAR EL RESULTADOS");
    }
  };
  const guardarResultadoInter = async ({ body }: Request, res: Response) => {
    try {
     const data = body
      const responseItem = await insertResultadoInterCentro(data);
      if(responseItem){
        res.json({msg:"Resultado guardado correctamente"});
      }
    } catch (e) {
      handleHttp(res, "ERROR AL GUARDAR LOS RESULTADOS", e);
    }
  };
  const eliminarResultadoInter = async ({ params }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await deleteResultadoInter(id);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ELIMINAR EL RESULTADO");
    }
  };
  export {
    obtenerResultadosInter,
    obtenerResultado1Inter,
    actualizarResultadoInter,
    guardarResultadoInter,
    eliminarResultadoInter,
    
  }