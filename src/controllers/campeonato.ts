import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
  getCampeonato,
  getCampeonatos,
  insertCampeonato,
  updateCampeonato,
  deleteCampeonato,
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

const getItems = async (req: requestExtend, res: Response) => {
  try {
    const response = await getCampeonatos();
    res.send({
      campeonatos: response,
      user: req.user,
    });
  } catch (e) {
    console.log(e);
    handleHttp(res, "ERROR AL OBTENER LOS CAMPEONATOS");
  }
};

const updateItem = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await updateCampeonato(id, body);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR AL ACTUALIZAR EL CAMPEONATO");
  }
};

const postItem = async ({ body }: Request, res: Response) => {
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

export { getItems, getItem, updateItem, postItem, deleteItem };
