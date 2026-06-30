import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export const sendEmail = async ({ to, subject, html }) => {
  if (!resend) {
    console.log("⚠️ RESEND_API_KEY not configured. Email sending skipped.");
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Website <website@resend.dev>",
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error(error);
      return;
    }

    console.log(data);
  } catch (error) {
    console.error(error);
  }
};