import { Resend } from "resend";
import { ENV } from "./env.js";

export const resendClient = new Resend(ENV.RESEND_API_KEY);
export const sender = {
  email: process.env.FROM_EMAIL,
  name: process.env.FROM_EMAIL_NAME,
};
