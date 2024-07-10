const vsInterEquipo = (teams: Array<any>) => {
    let equipos: Array<any> = teams.slice(); // Crear una copia para no modificar el array original
    const vs = [];

    for (let i = 0; i < equipos.length; i++) {
        for (let j = i + 1; j < equipos.length; j++) {
            const equipo1 = equipos[i];
            const equipo2 = equipos[j];

            vs.push({
                equipo1: {
                    name: equipo1.nombreEquipo,
                    idEquipo: equipo1._id
                },
                equipo2: {
                    name: equipo2.nombreEquipo,
                    idEquipo: equipo2._id
                }
            });
        }
    }

    return vs;
};
 export default vsInterEquipo;