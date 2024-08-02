import { EquiposInscriptos } from "../interfaces/equipoInscriptos.interface"

const obtenerEquiposInscritos =(campeonatos:Array<any>, equiposInscritos:Array<EquiposInscriptos>)=>{
    let equiposN=[]

    for (let i = 0; i < campeonatos.length; i++) {
        const equipos = equiposInscritos.filter((equipo)=> equipo.idCampeonato  == campeonatos[i]._id)

        equiposN.push(equipos)
    }

    return equiposN
}

export default obtenerEquiposInscritos
