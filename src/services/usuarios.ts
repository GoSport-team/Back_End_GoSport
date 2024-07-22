import UsuarioModel from "../models/usuario";
import { Usuarios } from "../interfaces/usuarios.interface";
import { hashSync } from "bcryptjs";

const insertarUsuario = async (usuario: Usuarios) => {
  const responseInsertU = await UsuarioModel.create(usuario);
  return responseInsertU;
};

const getUsuarios = async () => {
  const responseGet = await UsuarioModel.find({});
  return responseGet;
};

const getUsuario = async (correo: string) => {
  try {
    const usuario = await UsuarioModel.findOne({ correo }).exec();
    return usuario;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw new Error("Error al obtener el usuario");
  }
};

const gettingByIdentificacion = async (identificacion: any) => {
  const unJugador = await UsuarioModel.find({ identificacion });
  return unJugador;
};

const updateUsuario = async (id: string, data: Usuarios) => {
  if (data.contrasena) {
    data.contrasena = hashSync(data.contrasena, 6);
  }
  const responseUsuario = await UsuarioModel.findOneAndUpdate(
    { _id: id },
    data,
    {
      new: true,
    }
  );
  return responseUsuario;
};

const patchUsuario = async (id: string, data: Usuarios) => {
  if (data.contrasena) {
    data.contrasena = hashSync(data.contrasena, 6);
  }
  try {
    const responseItemNecesseary = await UsuarioModel.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { new: true }
    );

    return responseItemNecesseary;
  } catch (error) {
    console.log("Error al hacer path", error);
    throw error;
  }
};

const deleteUsuario = async (id: string) => {
  const responseDelete = await UsuarioModel.deleteOne({ _id: id });
  return responseDelete;
};

export {
  insertarUsuario,
  getUsuarios,
  getUsuario,
  gettingByIdentificacion,
  updateUsuario,
  deleteUsuario,
  patchUsuario,
};
