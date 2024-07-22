import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface requestExtend extends Request {
  user?: JwtPayload;
  rol?: String;
  campeonato?: boolean;
}
