import VSModel from "../models/vs";
import { VS } from "../interfaces/vs.interface";
import randomEquipo from "../helpers/randomEquipos";
import equipoVs from "../helpers/equipoVs";


const insertVS = async (equipos?:any, IdFase?: String) => {
    const equiposSorteados = randomEquipo(equipos)
    const equiposvs = equipoVs(equiposSorteados)
    try {
        //utilizamos el promise all para asegurarnos de que todos los vs que nos devuelve la funcion equipoVs se guarden correctamente
          await Promise.all(equiposvs.map(async (equipoFormado) => {
    
            console.log(equipoFormado)
            try {
             // inicialmente se guarda el nombre del equipo y el ID, despues se agrega la hora de juego y la fecha
              const resultado = new VSModel({
                equipo1:{name: equipoFormado.team1.name,
                  idEquipo: equipoFormado.team1.idEquipo
                },
                equipo2:{name: equipoFormado.team2.name,
                  idEquipo: equipoFormado.team2.idEquipo},
                IdFase: IdFase,
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
  
  const getVS = async (IdFase:String ) => {

    const responseItem = await VSModel.find({IdFase});
    return responseItem;
  };
  
  const getVS1 = async (id: string) => {
    const responseItem = await VSModel.findOne({ _id: id });
    return responseItem;
  };
  
  const updateVS = async (id: string, data: VS) => {
    const responseItem = await VSModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    return responseItem;
  };
  
  const deleteVS = async (id: string) => {
    const responseItem = await VSModel.deleteOne({ _id: id });
    return responseItem;
  };
  

export{
    insertVS,
    getVS,
    getVS1,
    updateVS,
    deleteVS
}
