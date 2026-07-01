import { Router } from "express";
import { Resend } from "resend";
import { logger } from "../lib/logger";

const contactRouter = Router();

contactRouter.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: "Name, email, and message are required." });
    return;
  }

  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    res.status(400).json({ error: "Invalid field types." });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: "Invalid email address." });
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    logger.error("RESEND_API_KEY is not configured");
    res.status(500).json({ error: "Email service is not configured." });
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["heidiwilliamsfoy@gmail.com"],
      replyTo: email,
      subject: `New message from ${name} via heidiwilliamsfoy.com`,
      html: `
        <div style="font-family: monospace; background: #0a0a0a; color: #00ff80; padding: 32px; border: 1px solid #00ff8033;">
          <h2 style="margin: 0 0 24px; font-size: 18px; text-transform: uppercase; letter-spacing: 2px;">NEW CONTACT FORM SUBMISSION</h2>
          <p style="margin: 0 0 8px;"><strong>NAME:</strong> ${name}</p>
          <p style="margin: 0 0 8px;"><strong>EMAIL:</strong> ${email}</p>
          <p style="margin: 24px 0 8px;"><strong>MESSAGE:</strong></p>
          <div style="border-left: 3px solid #00ff80; padding-left: 16px; white-space: pre-wrap;">${message}</div>
          <p style="margin: 32px 0 0; font-size: 11px; color: #00ff8066;">Sent from heidiwilliamsfoy.com</p>
        </div>
      `,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    logger.error({ err }, "Failed to send contact email");
    res.status(500).json({ error: "Failed to send message. Please try again." });
  }
});

export default contactRouter;
