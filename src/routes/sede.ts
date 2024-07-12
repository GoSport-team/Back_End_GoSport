import { Router } from "express";
import {
  
  getSede,
  getSedes,
  insertSede,
  
} from "../controllers/sede"; 


const router = Router();

router.get("/", getSedes);

router.get("/:id", getSede);

router.post("/", insertSede);


export { router };
