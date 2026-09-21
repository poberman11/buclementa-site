import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createContactRequest } from "./db";

const contactInput = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(320),
  company: z.string().trim().min(2).max(200),
  businessType: z.string().trim().min(2).max(100),
  message: z.string().trim().min(10).max(4000),
  website: z.string().max(200).optional(),
});

type ContactPayload = z.infer<typeof contactInput>;

async function sendContactEmail(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_EMAIL;
  if (!apiKey || !recipient) return false;

  const from = process.env.EMAIL_FROM || "BucleMenta <onboarding@resend.dev>";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      reply_to: payload.email,
      subject: `Nueva solicitud de ${payload.name} · ${payload.company}`,
      text: [
        `Nombre: ${payload.name}`,
        `Correo: ${payload.email}`,
        `Empresa: ${payload.company}`,
        `Tipo de negocio: ${payload.businessType}`,
        "",
        "Qué tarea se repite:",
        payload.message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    console.error("[Contact] Email provider rejected request", await response.text());
    return false;
  }
  return true;
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  contact: router({
    submit: publicProcedure.input(contactInput).mutation(async ({ input }) => {
      // Honeypot: respond successfully without processing bot submissions.
      if (input.website) return { success: true, emailSent: false, ownerNotified: false };

      let emailSent = false;
      try {
        emailSent = await sendContactEmail(input);
      } catch (error) {
        console.error("[Contact] Email delivery failed", error);
      }

      let ownerNotified = false;
      try {
        ownerNotified = await notifyOwner({
          title: `Nueva solicitud de ${input.company}`,
          content: `${input.name} (${input.email}) · ${input.businessType}\n\n${input.message}`,
        });
      } catch (error) {
        console.error("[Contact] Owner notification failed", error);
      }

      await createContactRequest({
        name: input.name,
        email: input.email,
        company: input.company,
        businessType: input.businessType,
        message: input.message,
        deliveryStatus: emailSent ? "email_sent" : ownerNotified ? "owner_notified" : "received",
      });

      return { success: true, emailSent, ownerNotified };
    }),
  }),
});

export type AppRouter = typeof appRouter;
