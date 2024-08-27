// import mongoose from "mongoose";
import JugadorDestacadoModelo from "../models/jugadorDestacado";
import { JugadorDestacado } from "../interfaces/jugadorDestacado";

const insertJugadorDestacado = async (data: JugadorDestacado)=>{
    const nuevoJugadorDestacado = new JugadorDestacadoModelo(data)
    await nuevoJugadorDestacado.save()
    return nuevoJugadorDestacado
}
const getJugadorDestacado = async()=>{
    return await JugadorDestacadoModelo.find();
}
const getIdJugadorDestacado = async(id:string)=>{
    return await JugadorDestacadoModelo.findById(id);
}
export {
    insertJugadorDestacado,
    getIdJugadorDestacado,
    getJugadorDestacado
}