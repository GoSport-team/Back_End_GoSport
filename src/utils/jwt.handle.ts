import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "tokengosport";

const generarToken =  (id: string)=> {
  const jwt = sign({ id }, JWT_SECRET, {
    expiresIn: "2h",
  });
  console.log(jwt)
  return  `${jwt}`;
};

const verificarToken = (jwt: string) => {
  const isOk = verify(jwt, JWT_SECRET);
  return isOk;
};

export { generarToken, verificarToken };
