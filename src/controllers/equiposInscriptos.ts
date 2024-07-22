import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
    insertEquipoInscripto,
    getEquiposInscriptos, 
    getEquitoInscripto,
    updateEquipoInscripto,
    deleteEquipoInscripto
} from '../services/equiposInscriptos'
import { requestExtend } from "../interfaces/request.interface";


const obtenerEquipoInscripto = async ({ params }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await getEquitoInscripto(id);
      const data = response ? response : "EQUIPO NO ENCONTRADO";
      res.send(data)
    } catch (e) {
      handleHttp(res, "ERROR AL OBTENER EL EQUIPO");
    }
  };
  
  const obtenerEquiposInscriptos = async ({headers}: requestExtend, res: Response) => {
    const {idCampeonato}= headers
    try {
      const response = await getEquiposInscriptos(`${idCampeonato}`);
      res.send(response);
    } catch (e) {
      handleHttp(res, 'ERROR AL OBTENER LOS EQUIPOS');
    }
  };

  const actualizarEquipoInscripto = async ({ params, body }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await updateEquipoInscripto(id, body);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ACTUALIZAR EL EQUIPO ");
    }
  };
  
  const GuardarEquiposInscriptos = async ({ body }: Request, res: Response) => {
    try {
      const responseItem = await insertEquipoInscripto(body);
      res.send({
        msg:'equipo guardado correctamente',
        inscripto: responseItem
       });
    } catch (e) {
      handleHttp(res, "ERROR AL GUARDAR EL EQUIPO", e);
    }
  };
  
  const eliminarEquipoInscripto = async ({ params }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await deleteEquipoInscripto(id);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ELIMINAR EL EQUIPO");
    }
  };


export {
    GuardarEquiposInscriptos,
    obtenerEquipoInscripto,
    obtenerEquiposInscriptos,
    actualizarEquipoInscripto,
    eliminarEquipoInscripto
}