import { Request, Response } from "express";
import { loginUsuario, registroNuevoUsuario } from "../services/auth";

const registerController = async ({ body }: Request, res: Response) => {
  try {
    const responUsuario = await registroNuevoUsuario(body);

    if (responUsuario === "Este correo e identificación ya existen") {
      res.status(409).send(responUsuario);
    } else if (responUsuario === "Este correo ya existe") {
      res.status(409).send(responUsuario);
    } else if (responUsuario === "Esta identificación ya existe") {
      res.status(409).send(responUsuario);
    } else {
      res.status(200).send(responUsuario);
    }
  } catch (error) {
    console.error("Error registrando usuario:", error);
    res.status(500).send("Error interno del servidor");
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
