export interface Campeonato{
    nombreDiciplinas: string,
    estadoCampeonato: "Creado" | "Inscripcion" | "RegistroFecha" | "Ejecucion" | "Finalizacion",
    tamanoEquipos: number,
    fechaInicio: string,
    fechaFin: string,
    tipoCampeonato: 'InterCentros' | 'InterFichas' | 'Recreacional'
    nombreCampeonato: string,
    descripcion: string,
    inicioInscripcion: string,
    finInscripcion: string,
    añoCreacion: number
}