import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
    insertVSInter,
    getVSInter,
    getVSInter1,
    updateVSInter,
    deleteVSInter
} from '../services/vsInter'

const obtenerVSInter= async ({headers}: Request, res: Response) => {
    try {
      const {idcampeonato} = headers
      const response = await getVSInter(`${idcampeonato}`);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL OBTENER LOS RESULTADOS");
    }
  }
  const obtenerVS1Inter = async ({params}: Request, res: Response) => {
    try {
      const {id} = params 
      const response = await getVSInter1(`${id}`);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL OBTENER LOS RESULTADOS");
    }
  };
  const actualizarVSInter = async ({ params, body }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await updateVSInter(id, body);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ACTUALIZAR EL RESULTADOS");
    }
  };
  const guardarVSInter = async ({ body }: Request, res: Response) => {
    try {
     const equipos = body.data.equipos
     const idCampeonato = body.data.idCampeonato
      const responseItem = await insertVSInter(equipos, idCampeonato);
      res.send(responseItem);
    } catch (e) {
      handleHttp(res, "ERROR AL GUARDAR LOS RESULTADOS", e);
    }
  };
  const eliminarVSInter = async ({ params }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await deleteVSInter(id);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ELIMINAR EL RESULTADO");
    }
  };
  export {
    obtenerVSInter,
    obtenerVS1Inter,
    actualizarVSInter,
    guardarVSInter,
    eliminarVSInter
  }