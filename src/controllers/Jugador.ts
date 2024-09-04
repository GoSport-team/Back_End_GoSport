
//import modeloJugador from "../models/Jugador";
import { upadate, deleteJugador, Optener,gettingById, guardar } from "../services/jugador";
import { Request,Response } from "express";
import { handleHttp } from "../utils/error.handle";


export const obtnerJugdor = async(_req:Request, res:Response)=>{
    try{
        const obteniendoJugaddor = await Optener();
        res.send(obteniendoJugaddor);
    }
    catch(error){
      handleHttp(res,"Error al obtener Jugadores");
    }

}
export const guardarJugador = async(req:Request, res:Response)=>{
    try{
      const guardo = await guardar(req.body)
        res.json(guardo);
    }
    catch(error){
        res.send(error).status(400);
    }
}
export const eliminarJugador = async(req:Request, res:Response)=>{
    const { id } = req.params;
    try{
      const  eliminando = await deleteJugador(id);
      if(!eliminando){
        res.send("No existe");
      }else{
        res.send({message:"Eliminado correctamente"});
      }
    }catch(error){
        res.send(error).status(400);
    }
}
export const obtenerIdJugador = async(req:Request, res:Response)=>{
    const { id } = req.params;
    try{
        const obteniendoById = await gettingById(id);
        // console.log(obteniendoById);
        if(!obteniendoById){
            handleHttp(res, "Error al traerJugador")
        }else{
           res.send(obteniendoById)
        }
    }
    catch(error){
        res.send(error).status(400);
    }
   
}
export const actualizarJugador = async(req: Request, res:Response)=>{
    const { id } = req.params;
    try{
    const actualizando = await upadate(id,req.body);
        res.send(actualizando)
    }catch(error){
        handleHttp(res, "NO SE ACTUALIZO")
    }
}
    