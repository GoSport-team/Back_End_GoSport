//check auth
import { NextFunction, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { verificarToken } from "../utils/jwt.handle";
import { requestExtend } from "../interfaces/request.interface";

const checkJwt = (req: requestExtend, res: Response, next: NextFunction) => {
  try {
    const jwtUsuario = req.headers.authorization || "";
    const jwt = jwtUsuario.split(" ").pop();
    const isUser = verificarToken(`${jwt}`);
    console.log(isUser);
    if (!isUser) {
      res.status(401).send("  No tienes un jwt valido");
    } else {
      if (typeof isUser === "string") {
      } else {
        req.user = isUser;
        req.rol = isUser.rol;
      }
      next();
    }
  } catch (e) {
    res.status(400);
    handleHttp(res, "Usuario no tiene permiso");
  }
};

export { checkJwt };
