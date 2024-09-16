// controllers/programaController.ts

import { Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import { getPrograma, getProgramas, insertPrograma,eliminarPrograma,actualizarprograma } from '../services/programa';


const getItems = async (_req: Request, res: Response) => {
    try {
        const response = await getProgramas();
        res.json(response);
    } catch (e) {
        handleHttp(res, 'ERROR AL OBTENER LOS PROGRAMAS', e);
    }
};

// Obtener un programa por ID
const getItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await getPrograma(id);
        if (response) {
            res.json(response);
        } else {
            res.status(404).json({ message: 'Programa no encontrado' });
        }
    } catch (e) {
        handleHttp(res, 'ERROR AL OBTENER EL PROGRAMA', e);
    }
};

// Crear un nuevo programa
const postItem = async (req: Request, res: Response) => {
    try {
        const responseItem = await insertPrograma(req.body);
        res.status(201).json(responseItem);
    } catch (e) {
        handleHttp(res, 'ERROR AL GUARDAR EL PROGRAMA', e);
    }
};


const deleteprograma = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await eliminarPrograma(id);
        if (response) {
            res.json({ message: 'Programa eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Programa no encontrado' });
        }
    } catch (e) {
        handleHttp(res, 'ERROR AL ELIMINAR EL PROGRAMA', e);
    }
};

const patchprograma = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const response = await actualizarprograma(id, data);
        if (response) {
            res.json(response);
        } else {
            res.status(404).json({ message: 'Programa no encontrado' });
        }
    } catch (e) {
        handleHttp(res, 'ERROR AL ACTUALIZAR EL PROGRAMA', e);
    }
}

export { getItems as getProgramas, getItem as getPrograma, postItem as insertPrograma, deleteprograma,patchprograma };
