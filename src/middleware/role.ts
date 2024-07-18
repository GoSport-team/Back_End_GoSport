import { NextFunction, Response } from "express";
import { requestExtend } from "../interfaces/request.interface";
import roles from "../config/rolesConfig";

const roleMiddleWare = (role: keyof typeof roles) => {
  return (req: requestExtend, res: Response, next: NextFunction) => {
    if (req.rol === role) {
      return next();
    } else {
      return res.status(403).json({ message: "Prohibido" });
    }
  };
};
export { roleMiddleWare };
