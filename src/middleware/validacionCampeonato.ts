import { NextFunction, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { requestExtend } from "../interfaces/request.interface";
import CampeonatoModel from "../models/campeonato";

export const validacionCampeonato = async (req: requestExtend, res: Response, next: NextFunction) => {
    try {
        const añoCliente = req.body.añoCreacion;
        const tipoCampeonato = req.body.tipoCampeonato;
        const centroFormacion = req.body.sede;
        const existeCampeonato = await CampeonatoModel.findOne({ tipoCampeonato, añoCreacion: añoCliente, sede: centroFormacion });

        if (centroFormacion === 'CTPI' && tipoCampeonato== 'Intercentros') {
            const campeonatosCTPI = await CampeonatoModel.find({ sede: 'CTPI' });
            const existeInterfichas = campeonatosCTPI.filter((campeonato) => campeonato.tipoCampeonato === 'Interfichas');
            console.log(existeInterfichas)
            if (existeInterfichas.length <1) {
                return res.status(403).json({
                    msg: 'Primero debes de crear un campeonato Interfichas',
                });
            }
        }

        if (existeCampeonato && tipoCampeonato !== "Recreativos") {
            return res.status(401).json({
                msg: `Ya tienes creado un campeonato de tipo ${tipoCampeonato} en el año ${añoCliente} para el centro ${centroFormacion}`,
            });
        }

       return next();
    } catch (error) {
        handleHttp(res, "ERROR", error);
    }
};
