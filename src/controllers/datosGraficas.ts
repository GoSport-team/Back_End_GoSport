import { Request,Response } from "express";
import { cantidadCampeonatos, numeroEquipos, numeroInscritos } from "../services/datosGraficas";

export const dataConteoEquipos = async(_red:Request, res:Response)=>{
    try {
        const response = await numeroEquipos()

        res.json(response) 
    } catch (error) {
        console.log(error)
    } 
}

export const dataConteoParticipantes =async(_red:Request, res:Response)=>{
    try {
        const response = await numeroInscritos()

        res.json(response) 
    } catch (error) {
        console.log(error)
    }
}


export const dataConteoCampeonatos =async(_red:Request, res:Response)=>{
    try {
        const response = await cantidadCampeonatos()

        res.json(response) 
    } catch (error) {
        console.log(error)
    }
}