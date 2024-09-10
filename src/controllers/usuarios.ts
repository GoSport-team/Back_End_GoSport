import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import UsuarioModel from "../models/usuario";
import {
  getUsuario,
  getUsuarios,
  updateUsuario,
  insertarUsuario,
  deleteUsuario,
  patchUsuario,
  gettingByIdentificacion,
  getIdentificacionParcial,
  getUserById
} from "../services/usuarios";
import { requestExtend } from "../interfaces/request.interface";
import fs from "fs-extra";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

export const eliminarFoto = [
  upload.single("file"),
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;

      // Obtener el usuario por ID
      const usuario = await UsuarioModel.findById(id);
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Verificar si el usuario tiene una foto asociada
      if (!usuario.public_id) {
        return res.status(400).json({ message: "No hay foto para eliminar" });
      }

      // Eliminar la foto de Cloudinary
      const result = await cloudinary.uploader.destroy(usuario.public_id);
      if (result.result !== "ok") {
        throw new Error("Error al eliminar la foto de Cloudinary");
      }

      // Eliminar la URL de la foto y el public_id del usuario en la base de datos
      usuario.url_foto = "";
      usuario.public_id = "";
      await usuario.save();

      // Enviar la respuesta
      return res.json({ message: "Foto eliminada exitosamente" });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      console.error("Error al eliminar la foto del usuario:", errorMessage);
      return res.status(500).json({
        message: "Error al eliminar la foto",
        error: errorMessage,
      });
    }
  },
];

export const actualizarFoto = [
  upload.single("file"),
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;

      // Verificar si se ha enviado un archivo para la foto
      if (!req.file) {
        // console.log(req.file);
        return res
          .status(400)
          .json({ message: "No se proporcionó ningún archivo" });
      }

      const usuario = await UsuarioModel.findById(id);
      if (!usuario) {
        return res.status(400).json({ message: "No existe usuario" });
      }
      // Subir la foto a Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: usuario?.public_id,
        overwrite: true,
      });

      // Actualizar solo los campos url_foto y public_id
      await UsuarioModel.findByIdAndUpdate(
        id,
        { url_foto: result.secure_url, public_id: result.public_id },
        { new: true }
      );
      // Eliminar el archivo local
      await fs.unlink(req.file.path);

      // Enviar la respuesta
      return res.json({
        message: "Foto actualizada exitosamente",
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
export const subirFoto = [
  upload.single("file"),
  async function subirFotoUsuario(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      console.log("Inicio de la función subirFotoUsuario");

      if (!req.file) {
        throw new Error("File not provided");
      }

      console.log("Archivo recibido:", req.file);

      // Subir el archivo a Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log("Resultado de la subida a Cloudinary:", result);

      // Obtener el usuario por ID
      const userId = req.params.id;
      console.log("ID del usuario recibido:", userId);

      const usuario = await UsuarioModel.findById(userId);
      console.log("Usuario encontrado:", usuario);

      if (!usuario) {
        throw new Error("User not found");
      }

      // Actualizar la URL de la foto y el public_id en la base de datos
      usuario.url_foto = result.secure_url;
      usuario.public_id = result.public_id;
      await usuario.save();
      console.log("Usuario actualizado:", usuario);

      // Eliminar el archivo local
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

const obtenerUsuarios = async (_req: Request, res: Response) => {
  try {
    const response = await getUsuarios();
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR AL OBTENER USUARIOS");
  }
};

const obtenerUsuarioId = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await getUsuario(id);
    const data = response ? response : "Usuario no encontrado";
    res.send(data);
  } catch (e) {
    handleHttp(res, "ERROR AL OBTENER USUARIO POR CORREO");
  }
  return;
};
const obtenerUserById = async({ params }: Request, res:Response)=>{
  try{
    const { id } = params;
    const response = await getUserById(id);
    const data = response ? response : "Usuario por id no encontrado";
    res.send(data);
  }catch(e){
    handleHttp(res, "ERROR AL OBTENER USUARIO POR ID");
  }
}

const obtenerPerfilUsuario = async (req: requestExtend, res: Response) => {
  try {
    const usuarioId = req.user?.id;
   // console.log("id del user:", usuarioId);

    if (!usuarioId) {
      return res.status(400).send("ID de usuario no encontrado en el token");
    }

    const usuario = await getUsuario(usuarioId);

    if (!usuario) {
      return res.status(404).send("Usuario no encontrado");
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).send("Error al obtener el perfil del usuario");
  }
  return;
};

const actualizarUsuario = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await updateUsuario(id, body);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR AL ACTUALIZAR USUARIO");
  }
};

const PatchesUsuario = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await patchUsuario(id, body);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR AL ACTUALIZAR USUARIO");
  }
};

const crearUsuario = async ({ body }: Request, res: Response) => {
 // console.log(body);
  try {
    const responseUsuario = await insertarUsuario(body);
    res.send(responseUsuario);
  } catch (e) {
    handleHttp(res, "ERROR AL CREAR USUARIO", e);
  }
};

const obtenerIdIdenfiticacion = async (req: Request, res: Response) => {
  const { identificacion } = req.params;
  try {
    const obteniendoByInden = await gettingByIdentificacion(identificacion);
    if (obteniendoByInden.length == 0) {
      handleHttp(res, "Error al traer el Jugador");
    } else {
      res.send(obteniendoByInden[0]);
    }
  } catch (error) {
    res.send(error).status(400);
  }
};
const obtenerIdIdenfiticacionPlanillero = async (req: Request, res: Response) => {
  const { identificacion } = req.params;
  try {
    const obteniendoByInden = await getIdentificacionParcial(identificacion);
    // const planillero= obteniendoByInden.filter((item)=>item.rol==='planillero')
    console.log(obteniendoByInden)
    if (obteniendoByInden.length === 0) {
     return handleHttp(res, "Error al traer el planillero");
    } else {
    return  res.send(obteniendoByInden);
    }
  } catch (error) {
   return res.send(error).status(400);
  }
};

const buscarPorIdentificacionParcial = async (req: Request, res: Response) => {
  const identificacion  = req.query.identificacion as String;
  console.log("Identificación recibida:", identificacion);
  if (!identificacion) {
    return res.status(400).send({ message: "Identificación es requerida." });
  }
  try {
    const resultados = await getIdentificacionParcial(
      identificacion.toString()
    );
    res.send(resultados);
  } catch (error) {
    console.error("Error en buscarPorIdentificacionParcial:", error);
    res.status(500).send({ message: "Error al realizar la búsqueda." });
  }
  return;
};

const eliminarUsuario = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await deleteUsuario(id);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR AL ELIMINAR USUARIOO");
  }
};
export {
  obtenerUsuarios,
  obtenerUsuarioId,
  actualizarUsuario,
  obtenerIdIdenfiticacion,
  buscarPorIdentificacionParcial,
  crearUsuario,
  eliminarUsuario,
  PatchesUsuario,
  obtenerPerfilUsuario,
  obtenerIdIdenfiticacionPlanillero,
  obtenerUserById
};
