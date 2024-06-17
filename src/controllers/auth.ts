import { Request, Response } from "express";
import { loginUsuario, registroNuevoUsuario } from "../services/auth";

const registerController = async ({ body }: Request, res: Response) => {
  const responUsuario = await registroNuevoUsuario(body);
  res.send(responUsuario);
};
const loginController = async ({ body }: Request, res: Response) => {
  const { correo, contrasena } = body;
  const responUsuario = await loginUsuario({ correo, contrasena });

  if (responUsuario == "Contraseña incorrecta") {
    res.status(403);
    res.send(responUsuario);
  } else {
    res.send(responUsuario);
  }
};

export { registerController, loginController };
