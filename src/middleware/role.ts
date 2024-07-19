import { NextFunction, Response } from "express";
import { requestExtend } from "../interfaces/request.interface";
import roles from "../config/rolesConfig";

const roleMiddleWare = (role: keyof typeof roles) => {
  return (req: requestExtend, res: Response, next: NextFunction) => {
    console.log("Rol requerido:", role); // Depuración
    console.log("Rol del usuario:", req.rol);
    if (req.rol === roles[role]) {
      return next();
    } else {
      return res.status(403).json({ message: "Prohibido" });
    }
  };
};
export { roleMiddleWare };
