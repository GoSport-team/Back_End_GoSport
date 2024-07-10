import { Router } from "express";
<<<<<<< HEAD
const  router = Router();
export {router};
=======
import {
  deleteItem,
  getItem,
  getItems,
  postItem,
  updateItem,
} from "../controllers/modalidad"; 
import { checkJwt } from "../middleware/session";

const router = Router();

router.get("/", checkJwt, getItems);

router.get("/:id", getItem);

router.post("/", postItem);

router.put("/:id", updateItem);

router.delete("/:id", deleteItem);

export { router };
>>>>>>> master
