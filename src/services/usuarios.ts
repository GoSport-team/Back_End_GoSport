import UsuarioModel from "../models/usuario";
import { Usuarios } from "../interfaces/usuarios.interface";

const insertarUsuario = async (usuario: Usuarios) => {
  const responseInsertU = await UsuarioModel.create(usuario);
  return responseInsertU;
};

const getUsuarios = async () => {
  const responseGet = await UsuarioModel.find({});
  return responseGet;
};

const getUsuario = async (id: string) => {
  const responseGet = await UsuarioModel.findOne({ _id: id });
  return responseGet;
};

const gettingByIdentificacion= async(identificacion:any)=>{
  const unJugador = await UsuarioModel.find({identificacion})
  return unJugador; 
}

const updateUsuario = async (id: string, data: Usuarios) => {
  const responseUsuario = await UsuarioModel.findOneAndUpdate(
    { _id: id },
    data,
    {
      new: true,
    }
  );
  return responseUsuario;
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
};
