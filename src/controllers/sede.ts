
import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
    getSede,
    getSedes,
    insertSede
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
        res.send( response);
    } catch (e) {
        console.log(e);
        handleHttp(res, "ERROR AL OBTENER LAS SEDES");
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

export { getItems as getSedes, getItem as getSede, postItem as insertSede };