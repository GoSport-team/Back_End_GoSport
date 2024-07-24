export interface Campeonato{
    nombreDisciplinas: string,
    estadoCampeonato: "Creado" | "Inscripcion" | "RegistroFecha" | "Ejecucion" | "Finalizacion",
    tamanoEquipos: number,
    fechaInicio: string,
    fechaFin: string,
    tipoCampeonato: string,
    sede:string,
    nombreCampeonato: string,
    descripcion: string,
    inicioInscripcion: string,
    finInscripcion: string,
    añoCreacion: number
}