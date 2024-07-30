// import { Request, Response, NextFunction } from "express";

// export const idHeadersEquiposInscritos = (req: Request, res: Response, next: NextFunction)=>{
//     const {idCampeonato} = req.headers;
//     if (idCampeonato) {
//         req.body.id = idCampeonato;
//         next();
//     }else{
//     res.status(400).json({error: 'Falta el id en el Headers'})
// }};
