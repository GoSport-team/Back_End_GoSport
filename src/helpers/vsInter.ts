const vsInterEquipo = (teams: Array<any>) => {
    let equipos: Array<any> = teams.slice(); // Crear una copia para no modificar el array original
    const vs = [];

    for (let i = 0; i < equipos.length; i++) {
        for (let j = i + 1; j < equipos.length; j++) {
            const equipo1 = equipos[i].Equipo;
            const equipo2 = equipos[j].Equipo;

            vs.push({
                equipo1,
               equipo2
            });
        }
    }

    return vs;
};
 export default vsInterEquipo;