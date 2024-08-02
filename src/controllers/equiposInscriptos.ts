import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
  validarInscripcionIntegrante,
    insertEquipoInscripto,
    getEquiposInscriptos, 
    getEquitoInscripto,
    updateEquipoInscripto,
    deleteEquipoInscripto,
    getEquipoInscritoCedula,
    validarSiEquipoYaEstaInscritoo
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
  


  const obtenerEquipoCedula = async ({params, headers}: Request, res:Response)=>{
    try {
      const {id} = params
      const {cedulajugador} = headers
      const response = await getEquipoInscritoCedula(id, `${cedulajugador}`)
      if(response){
        res.send({
          msg:"Equipo ya esta Inscrito al campeonato"
        })
      }else{
        res.send({
          msg:"Equipo no inscrito",
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const verificarSiEquipoYaEstaInscrito = async ({ headers}: Request, res:Response)=>{
    try {
      const {cedulajugador} = headers
      const data = await validarSiEquipoYaEstaInscritoo(`${cedulajugador}`)
      if(data.length >0){
        res.send({
          msg:"Equipo ya esta Inscrito en un campeonato"
        })
      }else{
        res.send({
          msg:"Equipo no inscrito a ningun campeonato",
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  const obtenerEquiposInscriptos = async ( {headers}: Request, res: Response) => {
    try {
      const {id} = headers;
      const response = await getEquiposInscriptos(`${id}`);
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
      const {id} = params;
      const response = await deleteEquipoInscripto(id);
      res.send(response);
      console.log('equipo borrado')
    } catch (e) {
      handleHttp(res, "ERROR AL ELIMINAR EL EQUIPO");
    }
  };


export {
    verificarSiEquipoYaEstaInscrito,
    validarInscripcionIntegrantee,
    obtenerEquipoCedula,
    GuardarEquiposInscriptos,
    obtenerEquipoInscripto,
    obtenerEquiposInscriptos,
    actualizarEquipoInscripto,
    eliminarEquipoInscripto
}