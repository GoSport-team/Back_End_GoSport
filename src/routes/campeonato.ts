import { Router } from "express";
import {
  deleteItem,
  getItem,
  getItems,
  postItem,
  updateItem,
} from "../controllers/campeonato";
import { checkJwt } from "../middleware/session";
import { validacionCampeonato } from "../middleware/validacionCampeonato";




const router = Router();

router.get("/",checkJwt,  getItems);

router.get("/:id",  getItem);

router.post("/",validacionCampeonato, postItem);

router.put("/:id", updateItem);

router.delete("/:id", deleteItem);

export { router };
