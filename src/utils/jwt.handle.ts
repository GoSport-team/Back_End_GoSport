import {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError,
  sign,
  verify,
} from "jsonwebtoken";
import { Response } from "express";

const JWT_SECRET = process.env.JWT_SECRETT || "secretSport";

const generarToken = (id: string, rol: string) => {
  const jwt = sign({ id, rol }, JWT_SECRET, {
    expiresIn: "2h",
  });
  return jwt;
};

const configuracionCookie = (res: Response, jwt: string) => {
  res.cookie("jwt", jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 2 * 60 * 60 * 1000,
    sameSite: "strict",
  });
};

const verificarToken = (jwt: string) => {
  try {
    const decoded = verify(jwt, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      console.error("El token ha expirado", error.message);
    } else if (error instanceof JsonWebTokenError) {
      console.error("Error de jwt", error.message);
    } else {
      console.error("Error al verificar token", error);
    }

    return null;
  }
};

export { generarToken, verificarToken, configuracionCookie };
