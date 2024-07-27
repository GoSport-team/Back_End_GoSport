import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
    insertModalidad,
    getModalidades,
    getModalidad
} from "../services/modalidad"; 


const getItem = async ({ params }: Request, res: Response) => {
    try {
        const { id } = params;
        const response = await getModalidad(id);
        const data = response ? response : "MODALIDAD NO ENCONTRADA";
        res.send(data);
    } catch (e) {
        handleHttp(res, "ERROR AL OBTENER LA MODALIDAD");
    }
};

const getItems = async (_req: Request, res: Response) => {
    try {
        const response = await getModalidades();
        res.send(response);
    } catch (e) {
        console.log(e);
        handleHttp(res, "ERROR AL OBTENER LAS MODALIDADES");
    }
};

const postItem = async ({ body }: Request, res: Response) => {
    try {
        const responseItem = await insertModalidad(body);
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, "ERROR AL GUARDAR LA MODALIDAD", e);
    }
};

export { getItems, getItem, postItem };
