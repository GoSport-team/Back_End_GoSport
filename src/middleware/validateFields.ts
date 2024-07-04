import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validateFields = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  return errors.isEmpty()
    ? next()
    : res.status(400).json({ errors: errors.array() });
};

export { validateFields };
