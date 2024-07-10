import { Request, Response } from "express";
import { loginUsuario, registroNuevoUsuario } from "../services/auth";

const registerController = async ({ body }: Request, res: Response) => {
  const responUsuario = await registroNuevoUsuario(body);
  if (responUsuario === "Este usuario ya existe") {
    res.status(409).send(responUsuario);
  } else {
    res.status(201).send(responUsuario);
  }
};

const loginController = async ({ body }: Request, res: Response) => {
  const { correo, contrasena } = body;

  try {
    const responUsuario = await loginUsuario({ correo, contrasena }, res);

    if (
      responUsuario === "Datos inválidos" ||
      responUsuario === "Contraseña incorrecta"
    ) {
      res
        .status(403)
        .send(
          "Las credenciales proporcionadas no son válidas. Por favor, verifica tus datos e intenta de nuevo."
        );
    } else {
      res.status(200).json(responUsuario);
    }
  } catch (error: any) {
    console.error("Error en el controlador de login:", error.message);
    res.status(500).send("Error en el servidor al intentar iniciar sesión");
  }
};

export { registerController, loginController };
