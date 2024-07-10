import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
    insertModalidad,
    getModalidades,
    getModalidad,
    updateModalidad,
    deleteModalidad
} from "../services/modalidad"; 

// Funciones de controlador para operaciones CRUD de Modalidad
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
        res.send({
            modalidades: response,
        });
    } catch (e) {
        console.log(e);
        handleHttp(res, "ERROR AL OBTENER LAS MODALIDADES");
    }
};

const updateItem = async ({ params, body }: Request, res: Response) => {
    try {
        const { id } = params;
        const response = await updateModalidad(id, body);
        res.send(response);
    } catch (e) {
        handleHttp(res, "ERROR AL ACTUALIZAR LA MODALIDAD");
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

const deleteItem = async ({ params }: Request, res: Response) => {
    try {
        const { id } = params;
        const response = await deleteModalidad(id);
        res.send(response);
    } catch (e) {
        handleHttp(res, "ERROR AL ELIMINAR LA MODALIDAD");
    }
};

export { getItems, getItem, updateItem, postItem, deleteItem };
