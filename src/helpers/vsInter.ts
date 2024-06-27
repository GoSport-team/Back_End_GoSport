const vsInter=(teams:Array<any> )=>{
   let equipos:Array<any>= teams
   
   function rotateArray<T>(arr: T[]){
    const firstElement = arr.shift()
    if (firstElement !== undefined) {
        arr.push(firstElement)
    return arr; }
    let cont:number = 1
  
   if(cont <=3){
    const vs=[]
  
   for(let i=0; i< equipos.length;i++) {
    const equipo1= equipos[i]
    const equipo2= equipos[i+1]
    if(equipo1&& equipo2){
        vs.push({
            equipo1:{
                 name:equipo1.nombreEquipo,
                idEquipo: equipo1._id
            },
            equipo2:{ 
                name:equipo2.nombreEquipo,
                idEquipo: equipo2._id}
        });
    }
    const equipo_1= equipos[i]
    const equipo_2= equipos[i+2]
    if(equipo_1&& equipo_2){
        vs.push({
            equipo1:{
                 name:equipo_1.nombreEquipo,
                idEquipo: equipo_1._id
            },
            equipo2:{ 
                name:equipo_2.nombreEquipo,
                idEquipo: equipo_2._id}
        });
    }
   
     equipos = rotateArray(equipos) || ["undefine"];
     cont=+1
     i==0
}
return vs
   }
}

}