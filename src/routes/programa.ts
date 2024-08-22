import { Router } from "express";

import { getProgramas, getPrograma, insertPrograma } from '../controllers/programa';

const router = Router();

router.get("/", getProgramas);
router.get("/:id", getPrograma);
router.post("/", insertPrograma);

export { router };
