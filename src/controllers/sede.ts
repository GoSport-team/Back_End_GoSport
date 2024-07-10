import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
    getSede,
    getSedes,
    insertSede,
    updateSede,
    deleteSede
} from '../services/sede';

const getItem = async ({ params }: Request, res: Response) => {
    try {
        const { id } = params;
        const response = await getSede(id);
        const data = response ? response : "SEDE NO ENCONTRADA";
        res.send(data);
    } catch (e) {
        handleHttp(res, "ERROR AL OBTENER LA SEDE");
    }
};

const getItems = async (_req: Request, res: Response) => {
    try {
        const response = await getSedes();
        res.send({
            sedes: response
        });
    } catch (e) {
        console.log(e);
        handleHttp(res, "ERROR AL OBTENER LAS SEDES");
    }
};

const updateItem = async ({ params, body }: Request, res: Response) => {
    try {
        const { id } = params;
        const response = await updateSede(id, body);
        res.send(response);
    } catch (e) {
        handleHttp(res, "ERROR AL ACTUALIZAR LA SEDE");
    }
};

const postItem = async ({ body }: Request, res: Response) => {
    try {
        const responseItem = await insertSede(body);
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, "ERROR AL GUARDAR LA SEDE", e);
    }
};

const deleteItem = async ({ params }: Request, res: Response) => {
    try {
        const { id } = params;
        const response = await deleteSede(id);
        res.send(response);
    } catch (e) {
        handleHttp(res, "ERROR AL ELIMINAR LA SEDE");
    }
};

export { getItems as getSedes, getItem as getSede, updateItem as updateSede, postItem as insertSede, deleteItem as deleteSede };
