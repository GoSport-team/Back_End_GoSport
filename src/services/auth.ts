import { Auth } from "../interfaces/auth.interface";
import { Usuarios } from "../interfaces/usuarios.interface";
import UsuarioModel from "../models/usuario";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { configuracionCookie, generarToken } from "../utils/jwt.handle";
import { Response } from "express";

const registroNuevoUsuario = async ({
  correo,
  contrasena,
  nombres,
  telefono,
  url_foto,
  identificacion,
  ficha,
  programa,
  finFicha,
  jornada,
  
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
    url_foto,
    identificacion,
    ficha,
    programa,
    finFicha,
    jornada,
    rol: "jugador",
  });
  return registroNuevoUsuario;
};

const loginUsuario = async ({ correo, contrasena }: Auth, res: Response) => {
  try {
    const checkIs = await UsuarioModel.findOne({ correo });
    if (!checkIs) {
      return "Datos inválidos";
    }

    const contrasenaHash = checkIs.contrasena;
    const esCorrecto = await verified(contrasena, contrasenaHash);

    if (!esCorrecto) {
      return "Contraseña incorrecta";
    }

    const token = generarToken(checkIs.correo, checkIs.rol);
    console.log(token);
    configuracionCookie(res, token);
    const data = {
      token,
      user: checkIs,
    };

    return data;
  } catch (error: any) {
    console.error("Error en el inicio de sesion:", error.message);
    throw new Error("Error en el inicio de sesion");
  }
};

export { registroNuevoUsuario, loginUsuario };
