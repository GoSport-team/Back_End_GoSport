//check auth
import { NextFunction, Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { verificarToken } from "../utils/jwt.handle";

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtUsuario = req.headers.authorization || "";
    const jwt = jwtUsuario.split(' ').pop();
    const isOk = verificarToken(`${jwt}`);
    console.log(isOk)
    if (!isOk) {
      res.status(401);
      res.send("  No tienes un jwt valido");
    } else {
      console.log({ jwtUsuario });
      next();
    }
  } catch (e) {
    res.status(400);
    handleHttp(res, "Usuario no tiene permiso");
  }
};

export { checkJwt };