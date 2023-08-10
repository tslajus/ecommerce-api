import sendEmail from "./sendEmail";

const sendResetPasswordEmail = async ({
  name,
  email,
  token,
  origin,
}: UserEmailOptions) => {
  const subject = "Reset password";
  const resetUrl = `${origin}/user/reset-password?token=${token}&email=${email}`;
  const message = `<p>Please reset password by clicking on the following link: <a href="${resetUrl}">Reset password</a></p>`;
  const html = `<div><h4>Hello, ${name}</h4><br>${message}</div>`;

  return sendEmail({
    to: email,
    subject,
    html,
  });
};

export default sendResetPasswordEmail;
