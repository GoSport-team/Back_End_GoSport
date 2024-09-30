import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";

import {
  getFasesCampeonato,
    insertFase,
    getFase,
    getFases,
    deleteFase,
    patchFase,
    patchFaseEstado,
    verificarEstadoEquipo
} from '../services/fase'


const obtenerFase = async ({ params }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await getFase(id);
      const data = response ? response : "FASE NO ENCONTRADO";
      res.send(data)
    } catch (e) {
      handleHttp(res, "ERROR AL OBTENER LA FASE");
    }
  };
  const obtenerFaseCampeonato = async ({headers}: Request, res: Response) => {
    try {
      const { id } = headers
      const response = await getFasesCampeonato(`${id}`);
if(response){
  const sorteo=true
  const datosfiltrados= response.filter((item)=>item.estado===true)
  const fasesfiltrados= response.filter((item)=>item.estado===false)
  return res.json({faseActiva:datosfiltrados,faseInactiva:fasesfiltrados, sorteo:sorteo})
}else{
  return res.send(false)
}
    } catch (e) {
     return handleHttp(res, "ERROR AL OBTENER LA FASE");
    }
  };
  
  const obtenerFases = async ({headers}: Request, res: Response) => {
    const { id } = headers;
    try {
      const response = await getFases(`${id}`);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL OBTENER LA FASES");
    }
  };
  
  const actualizarFase = async ({ params, body }: Request, res: Response) => {
    try {
      const { id } = params; 
      const response = await patchFase(id, body);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ACTUALIZAR LA FASE");
    }
  };
  const actualizarFaseEstado = async ({ params, body }: Request, res: Response) => {
    try {
      const { id } = params; 
      const response = await patchFaseEstado(id, body);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ACTUALIZAR LA FASE");
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
      handleHttp(res, "ERROR AL GUARDAR LA FASE", e);
    }
  };
  
  const eliminarFase = async ({ params }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await deleteFase(id);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ELIMINAR LA FASE");
    }
  };

  const obtenerEstadoEquipo = async (req: Request, res: Response) => {
    try {
      
      const idEquipo = req.headers["idequipo"] || req.headers["idEquipo"];
      const { idCampeonato } = req.params;
  
      console.log('idEquipo:', idEquipo);  
      console.log('idCampeonato:', idCampeonato);
  
   
      if (!idEquipo || !idCampeonato) {
        return res.status(400).send("Se requieren los campos idEquipo y idCampeonato.");
      }
  
     
      const estadoEquipo = await verificarEstadoEquipo(idEquipo.toString(), idCampeonato.toString());
  
      res.send(estadoEquipo);
    } catch (e) {
      handleHttp(res, "ERROR AL OBTENER EL ESTADO DEL EQUIPO", e);
    }
    return;
  };
  

export {
  obtenerFaseCampeonato,
    GuardarFase,
    obtenerFase,
    obtenerFases,
    actualizarFase,
    eliminarFase,
    actualizarFaseEstado,
    obtenerEstadoEquipo
}