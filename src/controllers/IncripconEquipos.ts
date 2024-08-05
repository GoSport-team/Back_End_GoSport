import { Request, Response} from "express";
import { handleHttp } from "../utils/error.handle";
import { v2 as cloudinary } from 'cloudinary';  
import {
  updateTeam,
    insertInscripcion,
    getEquipo,
    getInscripcionEquipos,
    updateEstado,
    deleteIncripcion
} from '../services/inscripcionEquipos'
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from "fs-extra";
import IncripcionEquiposModel from "../models/InscripcionEquipos";

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${uuidv4()}${ext}`;
      cb(null, filename);
  }
});

const upload = multer({storage})

export const subirFoto = [
  upload.single('file'),  
  async function subirFotoUsuario(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.file) {
        throw new Error('File not provided');
      }
      // Subir el archivo a Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log("Resultado de la subida a Cloudinary:", result);
  
      //Elimina la foto local
      await fs.unlink(req.file.path);
      // Enviar la respuesta
      return res.json({
        message: 'Photo uploaded successfully',
        url: result.secure_url,
        public_id: result.public_id
      });
  
    } catch (error: unknown) {
      const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
      console.error("Error en subirFotoUsuario:", errorMessage); // Log error details
      return res.status(500).json({
        message: 'Error uploading photo',
        error: errorMessage
      });
    }
  }
]

export const actualizarLogo = [
  upload.single('file'),
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id,idLogo } = req.params;
      
      // Verificar si se ha enviado un archivo para la foto
      if (!req.file) {
        console.log(req.file);
        return res.status(400).json({ message: 'No se proporcionó ningún archivo' });
      }
      console.log(idLogo)
      console.log(id)

      const resultEliminar = await cloudinary.uploader.destroy(idLogo);
      if (resultEliminar.result !== 'ok') {
        throw new Error('Error al eliminar la foto de Cloudinary');
      }

      // Subir la foto a Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // Actualizar solo los campos url_foto
      const equipo = await IncripcionEquiposModel.findByIdAndUpdate(
        id,
        { imgLogo: result.secure_url,
          idLogo: result.public_id
        },
        { new: true } // Esto devuelve el documento actualizado
      );

      if (!equipo) {
        return res.status(404).json({ message: 'Equipo no encontrado' });
      }

      // Eliminar el archivo local
      await fs.unlink(req.file.path);

      // Enviar la respuesta
      return res.json({
        message: 'Logo actualizado exitosamente',
        url: result.secure_url,
        public_id: result.public_id,
      });
    } catch (error: unknown) {
      const errorMessage = (error instanceof Error) ? error.message : 'Error desconocido';
      console.error("Error al actualizar la foto del usuario:", errorMessage);
      return res.status(500).json({
        message: 'Error al actualizar la foto',
        error: errorMessage,
      });
    }
  }
];

const obtenerInscripcionesEquipos = async ({headers}: Request, res: Response) => {
    try {
      const {IdCampeonato} = headers
      const response = await getInscripcionEquipos(`${IdCampeonato}`);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL OBTENER LOS EQUIPOS INSCRITOS");
    }
  };

  const obtenerInscripcionEquipo = async (req: Request, res: Response) => {
    try {
    
      const {id} = req.params;
      const response = await getEquipo(id);
      const data = response ? response : "EQUIPO NO ENCONTRADO";
      res.send(data)
    } catch (e) {
      handleHttp(res, "ERROR AL OBTENER EL EQUIPO");
    }
  };
  
  
  const actualizarEquipo = async ({ params, body }: Request, res: Response) => {
    try {
      const { id } = params;
      console.log(id)
      const response = await updateEstado(id, body);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ACTUALIZAR EL EQUIPO");
    }
  };

  const actualizarEquipoCompleto = async ({ params, body }: Request, res: Response) => {
    try {
      const { id } = params;
      console.log(id)
      const response = await updateTeam(id, body);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ACTUALIZAR EL EQUIPO");
    }
  };
  
  const guardarInscripcionDeEquipo = async ({ body }: Request, res: Response) => {
    //validar numeros de telefono
    try {
      const responseItem = await insertInscripcion(body);
      res.send({
        msg:"Equipo guardado Correctamente",
        equipo: responseItem
      });
    } catch (e) {
      handleHttp(res, "ERROR AL GUARDAR EL EQUIPO", e);
    }
  };
  
  const eliminarEquipo= async ({ params }: Request, res: Response) => {
    const { id } = params;
    if(!id) res.status(400).send({message:'equipo no encontrado'})
    try {
      const response = await deleteIncripcion(id);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR AL ELIMINAR EL RESULTADO");
    }
  };


export{
  // equiposGanadores,
    obtenerInscripcionesEquipos,
    obtenerInscripcionEquipo,
    guardarInscripcionDeEquipo,
    actualizarEquipoCompleto,
    actualizarEquipo,
    eliminarEquipo
}