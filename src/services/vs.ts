import VSModel from "../models/vs";
import { VS } from "../interfaces/vs.interface";
import randomEquipo from "../helpers/randomEquipos";
import equipoVs from "../helpers/equipoVs";
import FaseModel from "../models/fase";

//Nueva Funcion 
const MejorPerdedor = async(IdFase?: String)=>{
  try{
      
      const Resultado = await VSModel.find({IdFase});//Que debo llmar aqui vs o resultados pq mostrar code model
      let gandores:any[] = [];
      let perdedores: any[] = [];

      Resultado.forEach(resultado=>{
        if (resultado.equipo1 > resultado.equipo2) {
          gandores.push(resultado.equipo1)
          perdedores.push(resultado.equipo2);
        }else{
          gandores.push(resultado.equipo2);
          perdedores.push(resultado.equipo1)
        }
      })
      await FaseModel.findByIdAndUpdate(IdFase, {
        equiposGanadores: gandores,
        equiposPerdedores: perdedores
      })
      const mejorPerdedor = randomEquipo(perdedores)[0];
      return mejorPerdedor;
    
  }catch(err){
    console.error('Error al procesar mejor perdedor:', err);
      throw err;
  }
} 

const insertVS = async (equipos?:any, IdFase?: String) => {
   const _id= IdFase
 //  console.log(equipos)
    try {
      const fase = await FaseModel.findById(_id);
      if (!fase) {
        throw new Error('Fase no encontrada');
      }

      const PrimeraFase = fase.estado;
      let equiposSorteados=equipos ;
      if (PrimeraFase) {
        equiposSorteados = randomEquipo(equipos)
      }
      const equiposvs = equipoVs(equiposSorteados)
        //utilizamos el promise all para asegurarnos de que todos los vs que nos devuelve la funcion equipoVs se guarden correctamente
          await Promise.all(equiposvs.map(async (equipoFormado) => {
    
            // console.log(equipoFormado)
            try {
             // inicialmente se guarda el nombre del equipo y el ID, despues se agrega la hora de juego y la fecha
              const resultado = new VSModel({
                equipo1:{informacion: equipoFormado.team1},
                equipo2:{informacion: equipoFormado.team2},
                IdFase: _id,
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
  
  const getVS = async (idfase:String ) => {
    const responseItem = await VSModel.find({IdFase :idfase});
    return responseItem;
  };

  const getVSPlanillero = async (identificacion:String) => {
    const responseItem = await VSModel.find({idPlanillero: identificacion});
      return responseItem;
  };
  
  const getVS1 = async (id: string) => {
    const responseItem = await VSModel.findOne({ _id: id });
    return responseItem;
  };
  


  const patchVs = async(id: string, data:VS)=>{
    try{
      
    const responseItemNecesseary = await VSModel.findOneAndUpdate({_id:id},
     data
      ,
       {new:true});

       return responseItemNecesseary;
    }catch(error){
      console.log("Error al hacer path", error);
      throw error;
    }

  }
  
  const deleteVS = async (id: string) => {
    const responseItem = await VSModel.deleteOne({ _id: id });
    return responseItem;
  };
  

export{
    insertVS,
    getVS,
    getVS1,
    deleteVS,
    patchVs,
    MejorPerdedor,
    getVSPlanillero
}
