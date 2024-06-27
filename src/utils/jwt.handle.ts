import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "tokengosport";

const generarToken =  (id: string, rol: string)=> {
  const jwt = sign({ id, rol }, JWT_SECRET, {
    expiresIn: "2h",
  });
  console.log(jwt)
  return  `${jwt}`;
};

const verificarToken = (jwt: string) => {
  try {
    const isOk = verify(jwt, JWT_SECRET);
    return isOk;
  } catch (error){
    return null;
  }
  
};

export { generarToken, verificarToken };
