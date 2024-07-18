
import { NextFunction, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { verificarToken } from "../utils/jwt.handle";
import { requestExtend } from "../interfaces/request.interface";

const checkJwt = (req: requestExtend, res: Response, next: NextFunction) => {
  try {
    const jwtUsuario = req.headers.authorization || req.cookies.token || "";
    const jwt = jwtUsuario.split(" ").pop();
    const decoded = verificarToken(`${jwt}`);
    console.log(decoded);
    if (!decoded) {
      res.status(401).send("  No tienes un jwt valido");
    } else {
      req.user = decoded;
      req.rol = decoded.rol;

      next();
    }
  } catch (e) {
    res.status(400);
    handleHttp(res, "Usuario no tiene permiso");
  }
};

export { checkJwt };
