import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
  seguirDeFase,
  insertResultado,
  getResultado,
  updateResultado,
  deleteResultado,
  getResult,
  getResultadoCameonato,
  // getEstadisticasEquipos
} from "../services/resultado";

const siguienteFaseGanadores = async ({ headers }: Request, res: Response) => {
  try {
    const { IdFase } = headers;
    const response = await seguirDeFase(`${IdFase}`);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR AL OBTENER LOS RESULTADOS");
  }
};
const obtenerResultados = async ({ headers }: Request, res: Response) => {
  try {
    const { idfase } = headers;
    const response = await getResultado(`${idfase}`);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR AL OBTENER LOS RESULTADOS");
  }
};
const obtenerResultadosCampeonatos = async ({ headers }: Request, res: Response) => {
  try {
    const { id } = headers;
    const response = await getResultadoCameonato(`${id}`);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR AL OBTENER LOS RESULTADOS");
  }
};

const obtenerResultado = async ({ params }: Request, res: Response) => {
  const { id } = params;
  try {
    const response = await getResult(`${id}`);
    if(!response) {
      return res.send(false)
    }
    
  return res.status(200).send( response );
  } catch (e) {
    return handleHttp(res, "ERROR AL OBTENER LOS RESULTADOS");
  }
};

const actualizarResultado = async (
  { params, body }: Request,
  res: Response
) => {
  try {
    const { id } = params;
    const response = await updateResultado(id, body);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR AL ACTUALIZAR EL RESULTADOS");
  }
};

const guardarResultado = async ({ body }: Request, res: Response) => {
  try {
    const responseItem = await insertResultado(body);
    console.log("resultado guardado correctamente")
    res.send(responseItem);
    
  } catch (e) {
    handleHttp(res, "ERROR AL GUARDAR LOS RESULTADOS", e);
  }
};

const eliminarResultado = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await deleteResultado(id);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR AL ELIMINAR EL RESULTADO");
  }
};

// const obtenerEstadisticas = async (req: Request, res: Response) => {
//   try {
//     const { idCampeonato } = req.params;
    
 
//     if (!idCampeonato) {
//       return res.status(400).json({ error: "El ID del campeonato es requerido" });
//     }

//     const estadisticas = await getEstadisticasEquipos(idCampeonato);
    
//     console.log("Estadísticas obtenidas:", estadisticas); 

  
//     if (!estadisticas ||
//         !estadisticas.equiposJuegoLimpio.length && 
//         !estadisticas.equiposMasGolesFavor.length && 
//         !estadisticas.equiposMallaMenosVencida.length) {
//       return res.status(404).json({ error: "No se encontraron estadísticas para este campeonato" });
//     }

//     res.json(estadisticas);
//   } catch (error) {
//     console.error("Error en obtenerEstadisticas:", error);
//     res.status(500).json({ error: "Error obteniendo estadísticas" });
//   }
//   return
// };

export {
  siguienteFaseGanadores,
  obtenerResultados,
  obtenerResultadosCampeonatos,
  actualizarResultado,
  guardarResultado,
  eliminarResultado,
  obtenerResultado,
  // obtenerEstadisticas
};
