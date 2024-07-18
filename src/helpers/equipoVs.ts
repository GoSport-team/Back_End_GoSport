const equipoVs = (teams: Array<any>) => {
   
    const vs = [];
    let id=0; 
    for (let i = 0; i < teams.length; i += 2) {
        const team1 = teams[i];
        const team2 = teams[i + 1];
        id +=1
        if (team2) {
            vs.push({
                id: id,
                team1:{
                     team1,
                },
                team2:{ 
                    team2,
                }
            });
        } else {
            vs.push({
                team1:{
                     team1
                    },
                team2:{
                     name:'no tiene nombre',
                    idEquipo: 'no tiene id'
                }
            });
        }
    }
   
    return vs;
};


export default equipoVs;