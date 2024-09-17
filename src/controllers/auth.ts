import { Request, Response } from "express";
import { loginUsuario, registroNuevoUsuario } from "../services/auth";
import bcrypt from 'bcrypt';
import { sendVerificationCodeEmail } from '../utils/emailSender';
import UsuarioModel from '../models/usuario';

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

    if (responUsuario.success){
      res.json(responUsuario)
    }else {
      res.status(400).json(responUsuario)
    }
     
  } catch (error: any) {
    console.error("Error en el controlador de login:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
};


const CerrarSesion = (_req: Request, res: Response) => {
  res.clearCookie('jwt', { path: '/' });
  res.status(200).send({ success: true, message: 'Sesión cerrada exitosamente' });
};



// Solicitar restablecimiento de contraseña con código de verificación
export const requestPasswordReset = async (req: Request, res: Response) => {
  const { correo } = req.body;

  try {
    const usuario = await UsuarioModel.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    usuario.resetPasswordToken = verificationCode;
    usuario.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos

    await usuario.save();
    await sendVerificationCodeEmail(usuario.correo, verificationCode);

    return res.status(200).json({ message: 'Código de verificación enviado por correo.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor', error });
  }
};


// Verificar el código de verificación
export const verifyCode = async (req: Request, res: Response) => {
  const { correo, codigo } = req.body;

  try {
    const usuario = await UsuarioModel.findOne({ correo });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (
      usuario.resetPasswordToken !== codigo ||
      usuario.resetPasswordExpires! < new Date()
    ) {
      return res.status(400).json({ message: 'Código de verificación inválido o expirado' });
    }

    return res.status(200).json({ message: 'Código verificado correctamente' });
  } catch (error) {
    console.error('Error en el servidor:', error);
    return res.status(500).json({ message: 'Error en el servidor', error });
  }
};

// Establecer la nueva contraseña
export const setNewPassword = async (req: Request, res: Response) => {
  const { correo, nuevaContrasena } = req.body;

  try {
    const usuario = await UsuarioModel.findOne({ correo });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const salt = await bcrypt.genSalt(10);
    usuario.contrasena = await bcrypt.hash(nuevaContrasena, salt);

    usuario.resetPasswordToken = undefined;
    usuario.resetPasswordExpires = undefined;

    await usuario.save();

    return res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error en el servidor:', error);
    return res.status(500).json({ message: 'Error en el servidor', error });
  }
};


export { registerController, loginController,CerrarSesion };
