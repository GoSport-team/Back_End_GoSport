import VSModel from "../models/vs";
import { VS } from "../interfaces/vs.interface";
import randomEquipo from "../helpers/randomEquipos";
import equipoVs from "../helpers/equipoVs";
import FaseModel from "../models/fase";
// import { Types } from "mongoose";
// import EquipoModel from "../models/equipos";
// import EquiposInscriptosModel from "../models/equiposInscriptos";




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

  const buscarPorEquipos = async (equipoId: string) => {
    try {
      // Consultar el modelo VS por los IDs de los equipos en las estructuras anidadas
      const resultados = await VSModel.find({
        $or: [
          { 'equipo1.informacion.team1.Equipo._id': equipoId },
          { 'equipo2.informacion.team2.Equipo._id': equipoId }
        ]
      }).exec();
  
      return resultados;
    } catch (error) {
      console.error('Error en el servicio al buscar los resultados:', error);
      throw new Error('Error en la búsqueda de resultados');
    }
  };
  // const obtenerVSDeEquipo = async (cedulaJugador: string) => {
  //   // 
  //   try {
  //     // Encuentra la inscripción del equipo basado en la cédula del jugador
  //     const inscripcion = await EquiposInscriptosModel.findOne({ "Equipo.participantes.cedula": cedulaJugador }).exec();
      
  //     if (!inscripcion) {
  //       throw new Error("Equipo no encontrado para el jugador");
  //     }onst equipoInscriptoId = inscripcion._id;
  
  //     if (!equipoInscriptoId) {
  //       throw new Error("ID del equipo inscrito no encontrado");
  //     }
  
  //     // Encuentra el VS basado en el ID del documento EquipoInscripto
  //     const vs = await VSModel.find({ equipoInscriptoId }).exec(); // Asegúrate de ajustar esto según cómo almacenas el ID del equipo en el VS
  //     return vs;
  //   } catch (error) {
  //     console.error("Error al obtener VS del equipo:", error);
  //     throw new Error("Error al obtener VS del equipo");
  //   }
  // };
  
  //     // Aquí accedemos al _id del documento EquipoInscripto, ya que `Equipo` no tiene un campo _id
      
  
  // const getVSPorJugador = async (idJugador: string) => {
  //   try {
  //     // Buscar el equipo en el que está inscrito el jugador
  //     const equipo = await EquipoModel.findOne({ participantes: idJugador });
      
  //     // Si el jugador no está en ningún equipo, retornamos null
  //     if (!equipo) {
  //       return null; // No pertenece a ningún equipo
  //     }
  
  //     // Buscar enfrentamientos (VS) donde el equipo esté involucrado (equipo1 o equipo2)
  //     const enfrentamientos = await VSModel.find({
  //       $or: [{ equipo1: equipo._id }, { equipo2: equipo._id }]
  //     });
  
  //     return enfrentamientos; // Devuelve los enfrentamientos
  //   } catch (e) {
  //     console.error("Error al obtener VS para el jugador:", e);
  //     throw e; // Lanza el error para manejarlo en el controlador
  //   }
  // }
  
export{
    insertVS,
    getVS,
    getVS1,
    deleteVS,
    patchVs,
    MejorPerdedor,
    getVSPlanillero,
    buscarPorEquipos

    // getVSPorJugador
    // obtenerVSDeEquipo
}
