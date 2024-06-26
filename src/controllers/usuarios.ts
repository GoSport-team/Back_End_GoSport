import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
  getUsuario,
  getUsuarios,
  updateUsuario,
  insertarUsuario,
  deleteUsuario,
} from "../services/usuarios";

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
    handleHttp(res, "ERROR AL OBTENER USUARIO POR ID");
  }
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

const crearUsuario = async ({ body }: Request, res: Response) => {
  try {
    const responseUsuario = await insertarUsuario(body);
    res.send(responseUsuario);
  } catch (e) {
    handleHttp(res, "ERROR AL CREAR USUARIO");
  }
};

const eliminarUsuario = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await deleteUsuario(id);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR AL ELIMINAR USUARIO");
  }
};

export {
  obtenerUsuarios,
  obtenerUsuarioId,
  actualizarUsuario,
  crearUsuario,
  eliminarUsuario,
};
