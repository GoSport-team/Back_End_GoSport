
import modeloJugador from "../models/Jugador";
import { Request,Response } from "express";

export const obtnerJugdor = async(_req:Request, res:Response)=>{
    try{
        const obteniendoJugaddor = await modeloJugador.find({});
        res.send(obteniendoJugaddor);
    }
    catch(error){
        res.send(error).status(400);
    }

}
export const guardarJugador = async(req:Request, res:Response)=>{
    try{
        const guardandoJugador =  new modeloJugador(req.body);
        const saveJugador = await guardandoJugador.save()
        res.json(saveJugador);
    }
    catch(error){
        res.send(error).status(400);
    }
}
export const eliminarJugador = async(req:Request, res:Response)=>{
    const { id } = req.params;
    try{
      const  eliminando = await modeloJugador.findByIdAndDelete(id);
      if(!eliminando){
        res.send("No existe");
      }else{
        res.send(eliminando);
      }
    }catch(error){
        res.send(error).status(400);
    }
}
export const obtenerIdJugador = async(req:Request, res:Response)=>{
    const { id } = req.params;
    try{
        const obteniendoById = await modeloJugador.findById(id);
        console.log(obteniendoById);
        if(!obteniendoById){
            res.send("Error").status(400);
        }else{
            res.send(obteniendoById);
        }
    }
    catch(error){
        res.send(error).status(400);
    }
   
}
export const actualizarJugador = async(req: Request, res:Response)=>{
    const { id } = req.params;
    const { jornada, numeroFicha, estado, nombrePrograma } = req.body;
    
  
        if([jornada, numeroFicha, estado, nombrePrograma].includes(' ')){
            res.send({message: "Todos los campos son obligatorios"});
        }

        const actualizando = await modeloJugador.findById(id); 
            if(!actualizando){
                res.send({message: "No existe Jugador"});
            }   else{
                try{
            
                    actualizando.jornada = jornada;
                    actualizando.numeroFicha = numeroFicha;
                    actualizando.estado = estado;
                    actualizando.nombrePrograma = nombrePrograma;
                    
                    res.send({message: "Actulizado Correctamente"})

                    await actualizando.save();

                }catch(error){
                res.send(error).status(400);
                }
            }
       
        
}
