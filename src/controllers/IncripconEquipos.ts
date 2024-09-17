import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { v2 as cloudinary } from "cloudinary";
import {
  updateTeam,
  insertInscripcion,
  getEquipo,
  getInscripcionEquipos,
  updateEstado,
  deleteIncripcion,
  // deleteIncripcion,
} from "../services/inscripcionEquipos";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs-extra";
import IncripcionEquiposModel from "../models/InscripcionEquipos";
import JugadorModel from "../models/Jugador";

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

export const subirFoto = [
  upload.single("file"),
  async function subirFotoUsuario(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      if (!req.file) {
        throw new Error("File not provided");
      }
      // Subir el archivo a Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log("Resultado de la subida a Cloudinary:", result);

      //Elimina la foto local
      await fs.unlink(req.file.path);
      // Enviar la respuesta
      return res.json({
        message: "Photo uploaded successfully",
        url: result.secure_url,
        public_id: result.public_id,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Error en subirFotoUsuario:", errorMessage); // Log error details
      return res.status(500).json({
        message: "Error uploading photo",
        error: errorMessage,
      });
    }
  },
];

export const actualizarLogo = [
  upload.single("file"),
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id, idLogo } = req.params;
      console.log('ID del equipo:', id);
      console.log('ID del logo:', idLogo);

      // Verificar si se ha enviado un archivo para la foto
      if (!req.file) {
        console.error('No se proporcionó ningún archivo. req.file:', req.file);
        console.log(req.file);
        return res
          .status(400)
          .json({ message: "No se proporcionó ningún archivo" });
      }
      console.log(idLogo);
      console.log(id);

      const resultEliminar = await cloudinary.uploader.destroy(idLogo);
      console.log('Resultado de la eliminación de la foto en Cloudinary:', resultEliminar);
      if (resultEliminar.result !== "ok") {
        throw new Error("Error al eliminar la foto de Cloudinary");
      }

      // Subir la foto a Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log('Resultado de la subida de la nueva foto a Cloudinary:', result);

      // Actualizar solo los campos url_foto
      const equipo = await IncripcionEquiposModel.findByIdAndUpdate(
        id,
        { imgLogo: result.secure_url, idLogo: result.public_id },
        { new: true } // Esto devuelve el documento actualizado
      );
      console.log('Equipo actualizado en la base de datos:', equipo);

      if (!equipo) {
        console.error('Equipo no encontrado con ID:', id);
        return res.status(404).json({ message: "Equipo no encontrado" });
      }

      // Eliminar el archivo local
      await fs.unlink(req.file.path);
      console.log('Archivo temporal eliminado:', req.file.path);

      // Enviar la respuesta
      return res.json({
        message: "Logo actualizado exitosamente",
        url: result.secure_url,
        public_id: result.public_id,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      console.error("Error al actualizar la foto del usuario:", errorMessage);
      return res.status(500).json({
        message: "Error al actualizar la foto",
        error: errorMessage,
      });
    }
  },
];

const obtenerInscripcionesEquipos = async (
  { headers }: Request,
  res: Response
) => {
  try {
    const { IdCampeonato } = headers;
    const response = await getInscripcionEquipos(`${IdCampeonato}`);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR AL OBTENER LOS EQUIPOS INSCRITOS");
  }
};

const obtenerInscripcionEquipo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { usuarioId } = req.body;
    const equipo = await getEquipo(id);
    if (!equipo) {
      return res.status(404).send("EQUIPO NO ENCONTRADO");
    }
    const jugador = await JugadorModel.findById(usuarioId);
    const esCapitan = jugador ? jugador.esCapitan : false;
    res.send({ equipo, esCapitan });
  } catch (e) {
    handleHttp(res, "ERROR AL OBTENER EL EQUIPO");
  }
  return;
};

const actualizarEquipo = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
    //console.log(id);
    const response = await updateEstado(id, body);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR AL ACTUALIZAR EL EQUIPO");
  }
};
const actualizarEquipoEstado = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
    //console.log(id);
    const response = await updateTeam(id, body);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR AL ACTUALIZAR EL EQUIPO");
  }
};

const actualizarEquipoCompleto = async (
  { params, body }: Request,
  res: Response
) => {
  try {
    const { id } = params;
    const { cedula, ...equipoData } = body; 
    const jugador = await JugadorModel.findOne({ identificacion: cedula });

   
    if (!jugador || !jugador.esCapitan) {
      return res
        .status(403)
        .send({ message: "No tienes permiso para editar el equipo" });
    }

    
    const response = await IncripcionEquiposModel.findByIdAndUpdate(
      id,
      equipoData,
      { new: true } 
    );

    if (!response) {
      return res.status(404).send({ message: "Equipo no encontrado" });
    }

    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR AL ACTUALIZAR EL EQUIPO", e);
  }
  return;
};



const guardarInscripcionDeEquipo = async ({ body }: Request, res: Response) => {
  try {
    const { cedula } = body;

    if (!cedula) {
      return res.status(400).send({ message: "El campo cedula es requerido." });
    }

    const usuarioActualizado = await JugadorModel.findOneAndUpdate(
      { identificacion: cedula },
      { esCapitan: true },
      { new: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }

    const responseItem = await insertInscripcion(body);

    res.send({
      msg: "Equipo guardado correctamente",
      equipo: responseItem,
    });
  } catch (e) {
    handleHttp(res, "ERROR AL GUARDAR EL EQUIPO", e);
  }
  return;
};

const eliminarEquipo = async ({ params }: Request, res: Response) => {
  const { id } = params;

  if (!id) {
    return res.status(400).send({ message: "Equipo no encontrado" });
  }

  try {
    const response = await deleteIncripcion(id);
    if (response.deletedCount > 0) {
      res.send({
        message:
          "Equipo eliminado y estado del capitán actualizado correctamente.",
        response,
      });
    } else {
      res
        .status(404)
        .send({ message: "No se encontró el equipo para eliminar." });
    }
  } catch (e) {
    handleHttp(res, "ERROR AL ELIMINAR EL RESULTADO", e);
  }
  return;
};

export {
  // equiposGanadores,
  obtenerInscripcionesEquipos,
  obtenerInscripcionEquipo,
  guardarInscripcionDeEquipo,
  actualizarEquipoCompleto,
  actualizarEquipo,
  eliminarEquipo,
  actualizarEquipoEstado
};
