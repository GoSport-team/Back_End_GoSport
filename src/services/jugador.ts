

import  {Jugador } from "../interfaces/jugador.interface";
import  JugadorModel  from "../models/Jugador";

const upadate =async(id:any, body: Jugador)=>{
    const itemJugador = await JugadorModel.findOneAndUpdate( {
        _id:id},body,{
            new:true,
        }
);
return itemJugador;  
}



const deleteJugador = async (id:any)=>{
    const eliminandoJugador = await JugadorModel.findOneAndDelete({
        _id:id
    },{
        delete:true
    }
)
return eliminandoJugador
}

const Optener = async() => {
    const obtener =  await JugadorModel.find({}).lean()
    return obtener;
}

const gettingById= async(id:any)=>{
    const unJugador = await JugadorModel.findOne({
        identificacion:id
    })
    return unJugador; 
}
const guardar = async(body:Jugador) =>{
    const Guardando = new JugadorModel(body);
    const save = Guardando.save();
    return save;
}
export {
    upadate,
    deleteJugador,
    Optener,
    gettingById,
    guardar
};