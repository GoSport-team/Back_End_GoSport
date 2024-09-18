import nodemailer from 'nodemailer';

export const sendVerificationCodeEmail = async (email: string, code: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gosport259@gmail.com',
      pass: 'jxxratuhufwfnsfz',
    },
  });

  const mailOptions = {
    to: email,
    from: 'support@tuapp.com',
    subject: 'Código de verificación para restablecer tu contraseña',
    text: `Tu código de verificación es: ${code}. Este código es válido por 10 minutos.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado correctamente');
  } catch (error) {
    const err = error as Error; // Type assertion
    console.error('Error al enviar el correo:', err.message);
    throw new Error(`Error al enviar el correo: ${err.message}`);
  }
};
