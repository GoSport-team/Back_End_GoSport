import { Router } from "express";
import {
  deleteItem,
  getDetallesCampeonato,
  getItem,
  getItems,
  postItem,
  updateItem,
  getInterfichasByYearController
} from "../controllers/campeonato";

import { validacionCampeonato } from "../middleware/validacionCampeonato";



const router = Router();

router.get("/year/:year", getInterfichasByYearController);
router.get("/",  getItems);

router.get("/:id",  getItem);

router.post("/",validacionCampeonato, postItem);

router.patch("/:id", updateItem);

router.delete("/:id", deleteItem);

router.get('/detalle/:id', getDetallesCampeonato);

export { router };
