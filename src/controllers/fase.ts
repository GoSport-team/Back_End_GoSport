import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";

import {
    insertFase,
    getFase,
    getFases,
    updateFase,
    deleteFase
} from '../services/fase'


const obtenerFase = async ({ params }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await getFase(id);
      const data = response ? response : "CAMPEONATO NO ENCONTRADO";
      res.send(data)
    } catch (e) {
      handleHttp(res, "ERROR AL OBTENER EL CAMPEONATO");
    }
  };
  
  const obtenerFases = async (res: Response) => {
    try {
      const response = await getFases();
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL OBTENER EL CAMPEONATOS");
    }
  };
  
  const actualizarFase = async ({ params, body }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await updateFase(id, body);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ACTUALIZAR EL CAMPEONATO");
    }
  };
  
  const GuardarFase = async ({ body }: Request, res: Response) => {
    try {
      const responseItem = await insertFase(body);
      res.send({
        msg:'fase actualizada correctamente',
        _id: responseItem._id
       });
    } catch (e) {
      handleHttp(res, "ERROR AL GUARDAR EL CAMPEONATO", e);
    }
  };
  
  const eliminarFase = async ({ params }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await deleteFase(id);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ELIMINAR EL CAMPEONATO");
    }
  };


export {
    GuardarFase,
    obtenerFase,
    obtenerFases,
    actualizarFase,
    eliminarFase
}