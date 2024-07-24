import { NextFunction, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { requestExtend } from "../interfaces/request.interface";
import CampeonatoModel from "../models/campeonato";

export const validacionCampeonato = async (req: requestExtend, res: Response, next: NextFunction)=>{
    try {     
        const añoCliente = req.body.añoCreacion
        const tipoCampeonato = req.body.tipoCampeonato
        const existeCampeonato = await CampeonatoModel.findOne({tipoCampeonato: tipoCampeonato, añoCreacion:añoCliente})
<<<<<<< HEAD
    
        if(existeCampeonato && tipoCampeonato != 'Recreativos' ){
=======
        console.log(existeCampeonato)
        if(existeCampeonato){
>>>>>>> 9a8b60f793a086a18cc9fe68511dce1e52cce294
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