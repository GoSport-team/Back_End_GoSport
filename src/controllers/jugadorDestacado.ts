
import { Request, Response } from 'express';
import {
    insertJugadorDestacado,
    getIdJugadorDestacado,
    getJugadorDestacado
} from '../services/jugadorDestacado';
import { handleHttp } from "../utils/error.handle";


  const insert = async (req: Request, res: Response) =>{
    try {
      const jugadorDestacado = await insertJugadorDestacado(req.body);
      res.status(201).json(jugadorDestacado);
    } catch (e) {
        handleHttp(res, "ERROR AL OBTENER El JUGADOR DESTACADO");
    }
  }

 
   const getTodoJugadorDestacado = async(_req: Request, res: Response) => {
    try {
      const jugadoresDestacados = await getJugadorDestacado();
      res.status(200).json(jugadoresDestacados);
    } catch (error) {
        handleHttp(res, "ERROR AL OBTENER El JUGADOR DESTACADO");
        
    }
  }

  const getByIdJugador = async({params}: Request, res: Response) =>{
    try {
        const {id} = params
      const jugadorDestacado = await getIdJugadorDestacado(id);
      const data = jugadorDestacado ? jugadorDestacado : "Jugador no encontrado";
      res.send(data)

    } catch (error) {
        handleHttp(res, "ERROR AL OBTENER El JUGADOR DESTACADO");

    }
  }
export{
    insert,
    getTodoJugadorDestacado,
    getByIdJugador
}
 