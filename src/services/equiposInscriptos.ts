import { EquiposInscriptos } from "../interfaces/equipoInscriptos.interface";
import EquiposInscriptosModel from "../models/equiposInscriptos";
import { InscripcionEquipos } from "../interfaces/incripcionEquipos.interface";
import CampeonatoModel from "../models/campeonato";
import obtenerEquiposInscritos from "../helpers/equiposInscritos";
const insertEquipoInscripto = async (item: EquiposInscriptos) => {
    const responseInsert = await EquiposInscriptosModel.create(item);
    return responseInsert;
  };
  

  const validarInscripcionIntegrante = async (id:String, idJugador:String)=>{
    const equipos = await EquiposInscriptosModel.find({idCampeonato:id})
   
    
    const jugadorYaInscrito = equipos.some((Equipo) =>
      (Equipo.Equipo as InscripcionEquipos).participantes.some((participante: any) => participante._id === idJugador)
  );
  
  
    return jugadorYaInscrito
  }

  const getEquipoInscritoCedula = async (idCampeonato:string, cedula:string)=>{
    
    const responseItem = await EquiposInscriptosModel.find({idCampeonato : idCampeonato});

    const existeEquipo = responseItem.some((Equipo)=>
      (Equipo.Equipo as InscripcionEquipos).cedula == cedula)

    return existeEquipo;
  }

  const validarSiEquipoYaEstaInscritoo = async (cedula:string)=>{
    
    const campeonatos = await CampeonatoModel.find();
    const campeonatosFiltrados = campeonatos.filter((campeonato) => 
      campeonato.estadoCampeonato === "Inscripcion" || campeonato.estadoCampeonato === "Ejecucion");

     
    const equiposInscriptos = await EquiposInscriptosModel.find();
   
    const equipos = obtenerEquiposInscritos(campeonatosFiltrados, equiposInscriptos)

   
    const validarInscripcionEquipo = equipos.filter((equipo) =>
       (equipo.filter((equipoN) => equipoN.Equipo.cedula === cedula)));

    const validacionFiltrada = validarInscripcionEquipo.filter((equipo)=>equipo.length>0)
    const equipoValidado = validacionFiltrada.filter((equipo)=> equipo.some((equipoF)=> equipoF.Equipo.cedula == cedula))
  
    return equipoValidado

  }

  const getEquiposInscriptos  = async (id: String ) => {
    const responseItem = await EquiposInscriptosModel.find({idCampeonato : id});
    return responseItem;
  };
  
  const getEquitoInscripto = async (id: string) => {
    const responseItem = await EquiposInscriptosModel.findOne({ _id: id });
    return responseItem;
  };
  
  

  const updateEquipoInscripto = async (id: string, data: EquiposInscriptos) => {
    const responseItem = await EquiposInscriptosModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    return responseItem;
  };
  
  const deleteEquipoInscripto = async (_id: string) => {
    const responseItem = await EquiposInscriptosModel.deleteOne({_id});
    return responseItem;
  };
  

export {
        validarSiEquipoYaEstaInscritoo,
        validarInscripcionIntegrante,
        getEquipoInscritoCedula,
        insertEquipoInscripto,
        getEquiposInscriptos,
        getEquitoInscripto,
        updateEquipoInscripto,
        deleteEquipoInscripto }