import { Router } from "express";

import { getProgramas, getPrograma, insertPrograma,deleteprograma,patchprograma } from '../controllers/programa';

const router = Router();

router.get("/", getProgramas);
router.get("/:id", getPrograma);
router.put("/:id",patchprograma);
router.delete("/:id",deleteprograma);
router.post("/", insertPrograma);

export { router };
