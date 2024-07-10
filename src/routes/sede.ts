import { Router } from "express";
import {
  deleteSede,
  getSede,
  getSedes,
  insertSede,
  updateSede,
} from "../controllers/sede"; 
import { checkJwt } from "../middleware/session";

const router = Router();

router.get("/", checkJwt, getSedes);

router.get("/:id", getSede);

router.post("/", insertSede);

router.put("/:id", updateSede);

router.delete("/:id", deleteSede);

export { router };
