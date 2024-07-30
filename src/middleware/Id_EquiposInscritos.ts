import { Request, Response, NextFunction } from "express";

export const idHeadersEquiposInscritos = (req: Request, res: Response, next: NextFunction)=>{
    const id = req.headers['campeonato'];
    if (id) {
        req.body.id = id;
        next();
    }else{
    res.status(400).json({error: 'Falta el id en el Headers'})
}};