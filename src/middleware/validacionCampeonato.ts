import { NextFunction, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { requestExtend } from "../interfaces/request.interface";
import CampeonatoModel from "../models/campeonato";

export const validacionCampeonato = async (req: requestExtend, res: Response, next: NextFunction)=>{
    try {     
        const añoCliente = req.body.añoCreacion
        const tipoCampeonato = req.body.tipoCampeonato
        const existeCampeonato = await CampeonatoModel.findOne({tipoCampeonato: tipoCampeonato, añoCreacion:añoCliente})
        console.log(existeCampeonato)
        if(existeCampeonato){
            res.status(401).json({
                msg:`No puedes crear mas de un campeonado de ${tipoCampeonato} en el año ${añoCliente} `
            })
        }else{
            next()
        }
    } catch (error) {
        handleHttp(res, "ERROR", error)
    }

}