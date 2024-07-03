import { NextFunction, Response } from "express";
import { requestExtend } from "../interfaces/request.interface";

const roleMiddleWare = (role: "jugador" | "organizador") => {
  return (req: requestExtend, res: Response, next: NextFunction) => {
    if (req.rol === role) {
      return next();
    } else {
      return res.status(403).json({ message: "prohibido" });
    }
  };
};

export { roleMiddleWare };
