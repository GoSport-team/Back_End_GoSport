import { hash, compare } from "bcryptjs";

const encrypt = async (contrasenaPlano: string) => {
  const contrasenaHash = await hash(contrasenaPlano, 10);
  return contrasenaHash;
};

const verified = async (contrasenaPlano: string, contraHash: string) => {
  const esCorrecto = await compare(contrasenaPlano, contraHash);
  return esCorrecto;
};

export { encrypt, verified };
