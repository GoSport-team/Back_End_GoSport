import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import randomEquipo from "../helpers/mejorPerdedor";
import {
    insertVS,
    getVS,
    getVS1,
    deleteVS,
    patchVs,
    getVSPlanillero
} from '../services/vs'

const mejorPerdedor= async({body}: Request, res:Response)=>{
const data = body
console.log(data.equiposPerdedores)
try{
const datos = randomEquipo(data.equiposPerdedores)
console.log(datos)
res.send(datos)
}catch(error){
  return handleHttp(res, "ERROR AL OBTENER LOS VS");
}
}
const obtenerVS = async ({headers}: Request, res: Response) => {
    try {
      const {idfase} = headers
      const response = await getVS(`${idfase}`);
      if(!response){
        return res.send(false)
      }
       return res.send(response);
    } catch (e) {
      return handleHttp(res, "ERROR AL OBTENER LOS VS");
    }
  };
  const obtenerVSPlanillero = async ({headers, params}: Request, res: Response) => {
    try {
      const{id}=params 
      const {identificacion} = headers
      const response = await getVSPlanillero(`${identificacion}`);
       //console.log(response)
      if(response){
        const vsFiltro= response.filter((item)=>item.id===id)
        return  res.send(vsFiltro)
      }
    } catch (e) {
      return handleHttp(res, "ERROR AL OBTENER LOS VS");
    }
  };
  const obtenerlosVsAsignadosAPlanillero = async ({headers}: Request, res: Response) => {
    try {
      const {identificacion} = headers
      if (!identificacion) {
        return res.status(400).send("Identificación no proporcionada");
    }
    const response = await getVSPlanillero(`${identificacion}`);
    console.log(response);
    res.send(response);
    } catch (e) {
      return handleHttp(res, "ERROR AL OBTENER LOS VS");
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
  

  const patchesVs = async({params, body}:Request, res:Response)=>{
    try {
      const { id } = params;
      console.log(body)
      const response = await patchVs(id, body);
      console.log('vs actualizado')
      console.log(response)
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ACTUALIZAR EL RESULTADOS");
    }
  }
  
  const guardarVS = async ({ body }: Request, res: Response) => {
    try {
     const equipos = body.dataVs.equipos
    //  console.log(equipos)
     const IdFase = body.dataVs.IdFase
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
    eliminarVS,
    patchesVs,
    obtenerVSPlanillero,
    mejorPerdedor,
    obtenerlosVsAsignadosAPlanillero
}