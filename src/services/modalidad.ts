
import { Modalidad } from "../interfaces/modalidad.interface";
import ModalidadModel from "../models/modalidad";

// Funciones de servicios para operaciones CRUD de Modalidad
const insertModalidad = async (item: Modalidad) => {
    const responseInsert = await ModalidadModel.create(item);
    return responseInsert;
};

const getModalidades = async () => {
    const responseItems = await ModalidadModel.find({});
    return responseItems;
};

const getModalidad = async (id: string) => {
    const responseItem = await ModalidadModel.findOne({ _id: id });
    return responseItem;
};

const updateModalidad = async (id: string, data: Modalidad) => {
    const responseItem = await ModalidadModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return responseItem;
};

const deleteModalidad = async (id: string) => {
    const responseItem = await ModalidadModel.deleteOne({ _id: id });
    return responseItem;
};

export { insertModalidad, getModalidades, getModalidad, updateModalidad, deleteModalidad };
