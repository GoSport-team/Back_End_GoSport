import vsInterModel from "../models/vsInter";
import { vsInter } from "../interfaces/vsInter.interface";
import vsInterEquipo from "../helpers/vsInter";
const insertVSInter = async (equipos?:any, IdCampeonato?: String) => {
    const equiposvs = vsInterEquipo(equipos)
    try {
          await Promise.all(equiposvs.map(async (equipoFormado) => {
    
            // console.log(equipoFormado)
            try {
              const resultado = new vsInterModel({
                equipo1:{name: equipoFormado.equipo1.name,
                  idEquipo: equipoFormado.equipo2.idEquipo
                },
                equipo2:{name: equipoFormado.equipo1.name,
                  idEquipo: equipoFormado.equipo2.idEquipo},
                IdCampeonaro: IdCampeonato,
              });
              await resultado.save();
            } catch (error) {
              console.error('Error al guardar el equipo:', error);
            }
          }))
    
        } catch (error) {
            console.error('Error al obtener equipos:', error);
        }
        return 'Equipos guardados correctamente'
      
  };
  const getVSInter = async (IdCampeonato:String ) => {

    const responseItem = await vsInterModel.find({IdCampeonato});
    return responseItem;
  };
  
  const getVSInter1 = async (id: string) => {
    const responseItem = await vsInterModel.findOne({ _id: id });
    return responseItem;
  };
  
  const updateVSInter = async (id: string, data: vsInter) => {
    const responseItem = await vsInterModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    return responseItem;
  };
  
  const deleteVSInter = async (id: string) => {
    const responseItem = await vsInterModel.deleteOne({ _id: id });
    return responseItem;
  };
  

export{
    insertVSInter,
    getVSInter,
    getVSInter1,
    updateVSInter,
    deleteVSInter
}