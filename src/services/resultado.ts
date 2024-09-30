
import { Resultado } from "../interfaces/resultados";
import ResultadoModel from "../models/resultado";
import VSModel from "../models/vs";

const seguirDeFase = async(IdFase:String)=>{

  const resultado = await ResultadoModel.find({IdFase})
  const vs = await VSModel.find({IdFase})

  if (resultado.length == vs.length){
    return {estadoFase:false}
  }else{
    return {estadoFase:true}
  }
}
const insertResultado = async (item: Resultado) => {
    const responseInsert = await ResultadoModel.create(item);
    return responseInsert;
  };
  const getResult = async (id: string) => {
    console.log(id)
    const responseItem = await ResultadoModel.findOne({ IdVs: id });
    // console.log(responseItem)
    return responseItem;
  };
  const getResultado = async (idfase:String) => {
    const responseItem = await ResultadoModel.find({IdFase : idfase});
    return responseItem;
  };
  
  const getResultadoCameonato = async (id:String) => {
    const responseItem = await ResultadoModel.find({idCampeonato : id});
    return responseItem;
  };

  const updateResultado = async (id: string, data: Resultado) => {
    const responseItem = await ResultadoModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    return responseItem;
  };
  
  const deleteResultado = async (id: string) => {
    const responseItem = await ResultadoModel.deleteOne({ _id: id });
    return responseItem;
  };

  // const getEstadisticasEquipos = async (idCampeonato: string) => {
   
  //   const resultados = await ResultadoModel.find({ idCampeonato }).exec();
  //   console.log("Datos obtenidos: ", resultados)
   
  //   return procesarEstadisticas(resultados);
  // };
  

  // const procesarEstadisticas = (resultados: Resultado[]) => {
  //   const equipos: { [key: string]: any } = {}; 
  
  //   resultados.forEach((resultado) => {
  //     const { equipo1, equipo2 } = resultado;
  
     
  //     const nombreEquipo1 = equipo1.equipo1.nombreEquipo;
  //     const tarjetasAmarillasEquipo1 = Array.isArray(equipo1.tarjetasAmarillas) ? equipo1.tarjetasAmarillas.length : 0;
  //     const tarjetasRojasEquipo1 = Array.isArray(equipo1.tarjetasRojas) ? equipo1.tarjetasRojas.length : 0;
  //     const golesEquipo1 = equipo1.goles;
  
  //     if (!equipos[nombreEquipo1]) {
  //       equipos[nombreEquipo1] = {
  //         golesFavor: 0,
  //         golesContra: 0,
  //         faltasAmarillas: 0,
  //         faltasRojas: 0,
  //       };
  //     }
  
  //     equipos[nombreEquipo1].golesFavor += golesEquipo1;
  //     equipos[nombreEquipo1].faltasAmarillas += tarjetasAmarillasEquipo1;
  //     equipos[nombreEquipo1].faltasRojas += tarjetasRojasEquipo1;
  
  //     const nombreEquipo2 = equipo2.equipo2.nombreEquipo;
  //     const tarjetasAmarillasEquipo2 =Array.isArray(equipo2.tarjetasAmarillas) ? equipo2.tarjetasAmarillas.length : 0;
  //     const tarjetasRojasEquipo2 = Array.isArray(equipo2.tarjetasRojas) ? equipo2.tarjetasRojas.length : 0;
  //     const golesEquipo2 = equipo2.goles;
  
  //     if (!equipos[nombreEquipo2]) {
  //       equipos[nombreEquipo2] = {
  //         golesFavor: 0,
  //         golesContra: 0,
  //         faltasAmarillas: 0,
  //         faltasRojas: 0,
  //       };
  //     }
  
  //     equipos[nombreEquipo2].golesFavor += golesEquipo2;
  //     equipos[nombreEquipo2].faltasAmarillas += tarjetasAmarillasEquipo2;
  //     equipos[nombreEquipo2].faltasRojas += tarjetasRojasEquipo2;
  
  //     // Agregar goles en contra
  //     equipos[nombreEquipo1].golesContra += golesEquipo2;
  //     equipos[nombreEquipo2].golesContra += golesEquipo1;
  //   });
  
    
  //   const equiposMasGolesFavor = Object.entries(equipos)
  //     .sort((a, b) => b[1].golesFavor - a[1].golesFavor)
  //     .map(([nombre, stats]) => ({
  //       nombre,
  //       golesFavor: stats.golesFavor,
  //     }));
  
  //   const equiposMallaMenosVencida = Object.entries(equipos)
  //     .sort((a, b) => a[1].golesContra - b[1].golesContra)
  //     .map(([nombre, stats]) => ({
  //       nombre,
  //       golesContra: stats.golesContra,
  //     }));
  
  //   const equiposJuegoLimpio = Object.entries(equipos)
  //     .sort((a, b) => (a[1].faltasAmarillas + a[1].faltasRojas) - (b[1].faltasAmarillas + b[1].faltasRojas))
  //     .map(([nombre, stats]) => ({
  //       nombre,
  //       faltas: stats.faltasAmarillas + stats.faltasRojas,
  //     }));
  
  //   return {
  //     equiposJuegoLimpio,
  //     equiposMasGolesFavor,
  //     equiposMallaMenosVencida,
  //   };
  // };

export{
  seguirDeFase,
    insertResultado,
    getResultado,
    getResultadoCameonato,
    updateResultado,
    deleteResultado,
    getResult,
    // getEstadisticasEquipos,
  
}
