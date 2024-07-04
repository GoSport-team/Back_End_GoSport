import { Router } from "express";
import { registerController, loginController } from "../controllers/auth";
import { check } from "express-validator";
import { validateFields } from "../middleware/validateFields";
import { checkJwt } from "../middleware/session";
import { roleMiddleWare } from "../middleware/role";

const router = Router();

router.post(
  "/register",
  [
    check("correo", "El correo debe ser válido").isEmail(),
    check(
      "contrasena",
      "La contraseña debete tener al menos 6 carácteres"
    ).isLength({ min: 6 }),
    validateFields,
  ],

  registerController
);

router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("contrasena", "La contraseña es obligatoria").not().isEmpty(),
    validateFields,
  ],
  loginController
);

router.get(
  "/ruta-jugador",
  checkJwt,
  roleMiddleWare("jugador"),
  (_req, res) => {
    res.json({ message: "Acceso permitido exclusivo para jugadores" });
  }
);

router.get(
  "/ruta-organizador",
  checkJwt,
  roleMiddleWare("organizador"),
  (_req, res) => {
    res.json({ message: "Acceso permitido exclusivo para organizadores" });
  }
);

export { router };
