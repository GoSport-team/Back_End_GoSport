import CampeonatoModel from "../models/campeonato";
import EquiposInscriptosModel from "../models/equiposInscriptos";

export const numeroEquipos = async () => {
    try {
        const  campeonatos = await CampeonatoModel.find()
        

        const equiposPromises = campeonatos.map(async (campeonato) => {
            const responseItem = await EquiposInscriptosModel.find({idCampeonato : campeonato._id});
            return responseItem;
        });
        const equipos = await Promise.all(equiposPromises);
        const conteoEquipos = equipos.map(equipo => equipo.length);
        const top5Equipos = conteoEquipos.sort((a, b) => b - a).slice(0, 5);

        return top5Equipos;
    } catch (error) {
        console.error('Error en el servicio para obtener el numero de equipos', error);
        return [];
    }
};

export const numeroInscritos =async()=>{
    try {    
        const campeonatos = await CampeonatoModel.find({});
        const equiposPromises = campeonatos.map(async (campeonato) => {
            const responseItem = await EquiposInscriptosModel.find({idCampeonato : campeonato._id});
            return responseItem;
        });
    
        try {
            const equipos = await Promise.all(equiposPromises);
            const conteoInscripciones = equipos.map((equipo)=>equipo.map((equipo)=> equipo.Equipo.participantes.length))  
            const sumaIntegrantes = conteoInscripciones.map((integrantes) =>  
                integrantes.reduce<number>((suma, valor) => suma + valor, 0)
            );
            
          const top5Inscripciones = sumaIntegrantes.sort((a,b)=> b-a).slice(0,6)
          const result=top5Inscripciones.slice().sort(() => Math.random() - 0.5);
            return result
        } catch (error) {
            console.error('Error al obtener los equipos:', error);
            return error
        }
    } catch (error) {
        console.error(error)
        return error
    }
}

export const cantidadCampeonatos =async()=>{
    try {
        const campeonatos = await CampeonatoModel.find({});

        const interfichas = campeonatos.filter((campeonato)=>campeonato.tipoCampeonato =='Interfichas')
        const intercentros = campeonatos.filter((campeonato)=>campeonato.tipoCampeonato=='Intercentros')
        const recreativos = campeonatos.filter((campeonato)=>campeonato.tipoCampeonato == 'Recreativos')

        return {
            interfichas:interfichas.length,
            intercentros:intercentros.length,
            recreativos:recreativos.length
        }

    } catch (error) {
        console.error(error)
        return error
    }
}

