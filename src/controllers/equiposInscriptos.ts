import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
  validarInscripcionIntegrante,
    insertEquipoInscripto,
    getEquiposInscriptos, 
    getEquitoInscripto,
    updateEquipoInscripto,
    deleteEquipoInscripto
} from '../services/equiposInscriptos'


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


  const validarInscripcionIntegrantee = async ({params, headers}: Request, res:Response)=>{
    try {
      const {id} = params
      const {idjugador} = headers
      const response = await validarInscripcionIntegrante(id, `${idjugador}`)
     
      if(response){
        res.send({
          msg:"Jugador ya existe en un equipo",
        })
      }else{
        res.send({
          msg:"Jugador no existe en ningun equipo",
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  const obtenerEquiposInscriptos = async ( {headers}: Request, res: Response) => {
    try {
      const {idCampeonato}= headers
      const response = await getEquiposInscriptos(`${idCampeonato}`);
        res.send(response)
    } catch (e) {
      handleHttp(res, "ERROR AL OBTENER EL EQUIPO");
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
    validarInscripcionIntegrantee,
    GuardarEquiposInscriptos,
    obtenerEquipoInscripto,
    obtenerEquiposInscriptos,
    actualizarEquipoInscripto,
    eliminarEquipoInscripto
}