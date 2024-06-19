import { Auth } from "../interfaces/auth.interface";
import { Usuarios } from "../interfaces/usuarios.interface";
import UsuarioModel from "../models/usuario";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generarToken } from "../utils/jwt.handle";

const registroNuevoUsuario = async ({
  correo,
  contrasena,
  nombres,
  telefono,
  genero,
  url_foto,
  identificacion,
  rol,
}: Usuarios) => {
  const checkIs = await UsuarioModel.findOne({
    correo,
    telefono,
    identificacion,
    
  });

  if (checkIs) return "Este usuario ya existe";
  const contraHash = await encrypt(contrasena);
  const registroNuevoUsuario = await UsuarioModel.create({
    correo,
    contrasena: contraHash,
    nombres,
    telefono,
    genero,
    url_foto,
    identificacion,
    rol,
  });
  return registroNuevoUsuario;
};

const loginUsuario = async ({ correo, contrasena }: Auth) => {
  const checkIs = await UsuarioModel.findOne({ correo });
  if (!checkIs) return "Datos inválidos";

  const contrasenaHash = checkIs.contrasena;
  const esCorrecto = await verified(contrasena, contrasenaHash);

  if (!esCorrecto) return "Contraseña incorrecta";

  const token = generarToken(checkIs.correo);
  console.log(token)
  const data = {
    token,
    user: checkIs,
  };

  return data;
};

export { registroNuevoUsuario, loginUsuario };
