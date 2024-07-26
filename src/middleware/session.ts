import { NextFunction, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { verificarToken } from "../utils/jwt.handle";
import { requestExtend } from "../interfaces/request.interface";

const checkJwt = (req: requestExtend, res: Response, next: NextFunction) => {
  try {
    const jwtUsuario = req.headers.authorization || req.cookies.token || "";
    const jwt = jwtUsuario.split(" ").pop();
    const decoded = verificarToken(`${jwt}`);

    if (!decoded) {
      return res.status(401).send("  No tienes un jwt valido");
    }
    if (typeof decoded === "string") {
      return res.status(401).send("token no valido");
    }
    console.log(decoded)
    req.user = decoded;
    req.rol = decoded.rol;
    console.log("Datos decodificados:", req.user);
    console.log("Rol en el jwt:", req.rol);

    next();
  } catch (e) {
    res.status(400);
    handleHttp(res, "Usuario no tiene permiso");
  }
  return;
};

export { checkJwt };
