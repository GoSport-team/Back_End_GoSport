import { Sede } from "../interfaces/sede.interface"; 
import SedeModel from "../models/sede"; 

const insertSede = async (item: Sede) => {
    const responseInsert = await SedeModel.create(item);
    return responseInsert;
};

const getSedes = async () => {
    const responseItems = await SedeModel.find({});
    return responseItems;
};

const getSede = async (id: string) => {
    const responseItem = await SedeModel.findOne({ _id: id });
    return responseItem;
};



export { insertSede, getSedes, getSede };