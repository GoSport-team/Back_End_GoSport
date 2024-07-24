//separar la tabla equipos con inscripcion equipos
import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
  updateTeam,
  // ganadores,
    insertInscripcion,
    getEquipo,
    getInscripcionEquipos,
    updateEstado,
    deleteIncripcion
} from '../services/inscripcionEquipos'

 
// const equiposGanadores = async ({headers}: Request, res: Response) => {
//   //guardar los equipos ganadores en una fase 
//   try {
//     const {idcampeonato} = headers
//     const response = await ganadores(`${idcampeonato}`);
//     res.send(response);
//   } catch (e) {
//     handleHttp(res, "ERROR AL OBTENER LOS EQUIPOS INSCRITOS");
//   }
// };

//no funcionaaaa
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
  
  
  const actualizarEquipo = async ({ params, body }: Request, res: Response) => {
    try {
      const { id } = params;
      console.log(id)
      const response = await updateEstado(id, body);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ACTUALIZAR EL EQUIPO");
    }
  };

  const actualizarEquipoCompleto = async ({ params, body }: Request, res: Response) => {
    try {
      const { id } = params;
      console.log(id)
      const response = await updateTeam(id, body);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ACTUALIZAR EL EQUIPO");
    }
  };
  
  const guardarInscripcionDeEquipo = async ({ body }: Request, res: Response) => {
    //validar numeros de telefono
    try {
      const responseItem = await insertInscripcion(body);
      res.send({
        msg:"Equipo guardado Correctamente",
        equipo: responseItem
      });
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
  // equiposGanadores,
    obtenerInscripcionesEquipos,
    obtenerInscripcionEquipo,
    guardarInscripcionDeEquipo,
    actualizarEquipoCompleto,
    actualizarEquipo,
    eliminarEquipo
}