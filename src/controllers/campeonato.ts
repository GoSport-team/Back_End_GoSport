import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";

import {
  getCampeonato,
  getCampeonatos,
  insertCampeonato,
  updateCampeonato,
  deleteCampeonato,
  obtenerDetalleCampeonato,
} from "../services/campeonato";
import { requestExtend } from "../interfaces/request.interface";


const getItem = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await getCampeonato(id);
    const data = response ? response : "CAMPEONATO NO ENCONTRADO";
    res.send(data);
  } catch (e) {
    handleHttp(res, "ERROR AL OBTENER EL CAMPEONATO");
  }
};

const getItems = async (_req: Request,  res: Response) => {
  //TODO: devolver solamente el campeonato ✅
  //estado campeonato  creado,  inscripcion, registro fecha, ejecucion, finalizacion ✅
  //agregar trim ✅ 
  //agregar intercentros o interfichas ✅
  //agregar tipo recreacional verificar que solamente se pueda crear un interfichas o intercentors✅
  
  try {
    const campeonato = await getCampeonatos();
    res.send(
      campeonato
    );
  } catch (e) {
    console.log(e);
    handleHttp(res, "ERROR AL OBTENER LOS CAMPEONATOS",e);
  }
};

const updateItem = async ({ params, body }: Request, res: Response) => {
  //funciona ✅
  const { id } = params;  
  try {
    const response = await updateCampeonato(id, body);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR AL ACTUALIZAR EL CAMPEONATO",e);
  }
};

const postItem = async (req: requestExtend, res: Response) => {
  const {body} = req
  try {
    const responseItem = await insertCampeonato(body);
    res.send(responseItem);
  } catch (e) {
    handleHttp(res, "ERROR AL GUARDAR EL CAMPEONATO", e);
  }
};

const deleteItem = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await deleteCampeonato(id);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR AL ELIMINAR EL CAMPEONATO");
  }
};
const getDetallesCampeonato = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const campeonato = await obtenerDetalleCampeonato(id);
    res.send(campeonato);
  } catch (e) {
    handleHttp(res, "ERROR AL OBTENER DETALLES DEL CAMPEONATO", e);
  }
};


export { getItems, getItem, updateItem, postItem, deleteItem, getDetallesCampeonato};
