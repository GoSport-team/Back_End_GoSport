import { Router } from "express";
import { registerController, loginController, CerrarSesion } from "../controllers/auth";
import { check } from "express-validator";
import { validateFields } from "../middleware/validateFields";
import { checkJwt } from "../middleware/session";
import { roleMiddleWare } from "../middleware/role";
import { requestPasswordReset, verifyCode, setNewPassword } from '../controllers/auth';

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
  roleMiddleWare('JUGADOR'),
  (_req, res) => {
    res.json({ message: "Acceso permitido exclusivo para jugadores" });
  }
);

router.get(
  "/ruta-organizador",
  checkJwt,
  roleMiddleWare('ORGANIZADOR'),
  (_req, res) => {
    res.json({ message: "Acceso permitido exclusivo para organizadores" });
  }
);
router.post(
  '/cerarSesion', CerrarSesion
)

// Ruta para solicitar un restablecimiento de contraseña
router.post('/solicitar-codigo', requestPasswordReset);
router.post('/verificar-codigo', verifyCode);
router.post('/cambio', setNewPassword);


export { router };
