import { Modalidad } from "../interfaces/modalidad.interface";
import ModalidadModel from "../models/modalidad";


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

export { insertModalidad, getModalidades, getModalidad,  };