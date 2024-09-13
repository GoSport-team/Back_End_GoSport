import { Programa } from "../interfaces/programas";
import ProgramaModel from "../models/programa";


const insertPrograma = async (item: Programa) => {
    try {
        const responseInsert = await ProgramaModel.create(item);
        return responseInsert;
    } catch (error) {
        // Verificar si el error es de tipo MongooseError
        if (error instanceof Error) {
            throw new Error(`Error al insertar el programa: ${error.message}`);
        } else {
            throw new Error('Error desconocido al insertar el programa');
        }
    }
};

// Obtener todos los programas
const getProgramas = async () => {
    try {
        const responseItems = await ProgramaModel.find({});
        return responseItems;
    } catch (error) {
        // Verificar si el error es de tipo MongooseError
        if (error instanceof Error) {
            throw new Error(`Error al obtener los programas: ${error.message}`);
        } else {
            throw new Error('Error desconocido al obtener los programas');
        }
    }
};

// Obtener un programa por ID
const getPrograma = async (id: string) => {
    try {
        const responseItem = await ProgramaModel.findById(id);
        if (!responseItem) {
            throw new Error('Programa no encontrado');
        }
        return responseItem;
    } catch (error) {
        // Verificar si el error es de tipo MongooseError
        if (error instanceof Error) {
            throw new Error(`Error al obtener el programa: ${error.message}`);
        } else {
            throw new Error('Error desconocido al obtener el programa');
        }
    }
};


const eliminarPrograma = async (id: string) => {
    try {
        const eliminarPrograma = await ProgramaModel.findOneAndDelete({ _id: id });
        return eliminarPrograma;
    } catch (e) {
        throw new Error(e instanceof Error ? e.message : 'Error desconocido para eliminar');
    }
};

// Actualizar un programa
const actualizarprograma = async (id: string, data: any) => {
    try {
        const programaActualizar = await ProgramaModel.findByIdAndUpdate(id, data, { new: true });
        return programaActualizar;
    } catch (e) {
        throw new Error(e instanceof Error ? e.message : 'Error desconocido para actualizar');
    }
};
export { insertPrograma, getProgramas, getPrograma,actualizarprograma,eliminarPrograma };