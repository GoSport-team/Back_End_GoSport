import bcrypt from 'bcrypt';
export const hashPassword = async (contrasena: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(contrasena, salt);
  return hashedPassword;
};
