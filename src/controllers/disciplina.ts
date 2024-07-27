
import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
    getDisciplina,
    getDisciplinas,
    insertDisciplina
} from '../services/disciplina';

const obtenerDisciplina = async ({ params }: Request, res: Response) => {
    try {
        const { id } = params;
        const response = await getDisciplina(id);
        if(response){
            res.send(response);
        }else{
            res.send('id no coincide con ninguna disciplina ')
        }
        
    } catch (e) {
        handleHttp(res, "ERROR AL OBTENER LA DISCIPLINA");
    }
};

const obtenerDisciplinas = async (_req: Request, res: Response) => {
    try {
        const response = await getDisciplinas();
        res.send( response);
    } catch (e) {
        console.log(e);
        handleHttp(res, "ERROR AL OBTENER LAS SEDES");
    }
};

const crearDisciplina = async ({ body }: Request, res: Response) => {
    try {
        const responseItem = await insertDisciplina(body);
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, "ERROR AL GUARDAR LA SEDE", e);
    }
};

export { obtenerDisciplina , obtenerDisciplinas , crearDisciplina  };