import roles from "../config/rolesConfig";
import { Auth } from "../interfaces/auth.interface";
import JugadorModel from "../models/Jugador";
import UsuarioModel from "../models/usuario";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { configuracionCookie, generarToken } from "../utils/jwt.handle";
import { Response } from "express";

const registroNuevoUsuario = async ({
  correo,
  contrasena,
  nombres,
  telefono,
  identificacion,
  url_foto,
  ficha,
  programa,
  finFicha,
  jornada,
  rol,
  
}: {
  correo: string;
  contrasena: string;
  nombres: string;
  telefono: string;
  identificacion: string;
  url_foto?: string;
  ficha?: string;
  programa?: string;
  finFicha?: Date;
  jornada?: "Mañana" | "Tarde" | "Noche";
  rol: string
}) => {
  const checkIs = await UsuarioModel.findOne({
    correo,
    identificacion,
  });

  if (checkIs) return "Este usuario ya existe";

  const contraHash = await encrypt(contrasena);
  
  let nuevoUsuario;
  rol = rol || roles.JUGADOR;

  switch (rol) {
    case roles.JUGADOR:
      nuevoUsuario = await JugadorModel.create({
        correo,
        contrasena: contraHash,
        nombres,
        telefono,
        identificacion,
        url_foto,
        ficha,
        programa,
        finFicha,
        jornada,
        rol: roles.JUGADOR,
      });
      break;
    case roles.ORGANIZADOR:
      nuevoUsuario = await UsuarioModel.create({
        correo,
        contrasena: contraHash,
        nombres,
        telefono,
        identificacion,
        url_foto,
        rol: roles.ORGANIZADOR,
      });
      break;
    case roles.PLANILLERO:
      nuevoUsuario = await UsuarioModel.create({
        correo,
        contrasena: contraHash,
        nombres,
        telefono,
        identificacion,
        url_foto,
        rol: roles.PLANILLERO,
      });
      break;
    default:
      throw new Error("Rol no válido");
  }

  return nuevoUsuario;
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
