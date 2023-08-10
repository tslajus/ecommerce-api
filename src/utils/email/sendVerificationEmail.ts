import sendEmail from "./sendEmail";

const sendVerificationEmail = async ({
  name,
  email,
  token,
  origin,
}: UserEmailOptions) => {
  const subject = "Email confirmation";
  const verifyEmail = `${origin}/user/verify-email?token=${token}&email=${email}`;
  const message = `<p>Please confirm your email by clicking on the following link: <a href="${verifyEmail}">Verify Email</a></p>`;
  const html = `<div><h4>Hello, ${name}</h4><br>${message}</div>`;

  return sendEmail({
    to: email,
    subject,
    html,
  });
};

export default sendVerificationEmail;
