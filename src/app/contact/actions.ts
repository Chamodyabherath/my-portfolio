"use server";

import { createHash } from "node:crypto";
import { isIP } from "node:net";
import { headers } from "next/headers";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { z } from "zod";
import { profile } from "@/data/profile";
import { contactConfiguration } from "@/lib/contact-config";

const messageSchema = z.object({
  company: z.string().trim().max(100),
  name: z.string().trim().min(1).max(80),
  email: z.email().max(120),
  subject: z
    .string()
    .trim()
    .min(1)
    .max(100)
    .regex(/^[^\r\n]+$/),
  message: z.string().trim().min(1).max(1500),
});

type ContactStatus = { state: "idle" | "error" | "sent"; message: string };

export async function sendPortfolioMessage(
  _status: ContactStatus,
  form: FormData,
): Promise<ContactStatus> {
  const config = contactConfiguration();
  const error = (message: string): ContactStatus => ({
    state: "error",
    message,
  });

  if (!config)
    return error("Online delivery is unavailable. Please use the email link.");
  if (form.get("website")) return error("The message could not be submitted.");

  const input = messageSchema.safeParse(
    Object.fromEntries(
      ["company", "name", "email", "subject", "message"].map((key) => {
        const value = form.get(key);
        return [key, typeof value === "string" ? value.trim() : ""];
      }),
    ),
  );
  if (!input.success)
    return error(
      "Check the required fields and field lengths, then try again.",
    );

  const incoming = await headers();
  const clientIp = incoming
    .get("x-vercel-forwarded-for")
    ?.split(",")[0]
    ?.trim();
  const visitor =
    process.env.VERCEL === "1" && clientIp && isIP(clientIp)
      ? createHash("sha256").update(clientIp).digest("hex")
      : "shared-origin";

  try {
    const redis = new Redis({ url: config.redisUrl, token: config.redisToken });
    const perVisitor = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "10 m"),
      prefix: "portfolio:contact:visitor",
      timeout: 0,
      ephemeralCache: false,
    });
    const global = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, "1 h"),
      prefix: "portfolio:contact:global",
      timeout: 0,
      ephemeralCache: false,
    });
    if (
      !(await perVisitor.limit(visitor)).success ||
      !(await global.limit("inbox")).success
    ) {
      return error(
        "The message limit was reached. Try again later or email me directly.",
      );
    }

    const { company, name, email, subject, message } = input.data;
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key":
          "portfolio-" +
          createHash("sha256").update(JSON.stringify(input.data)).digest("hex"),
      },
      body: JSON.stringify({
        from: config.from,
        to: [profile.email],
        reply_to: email,
        subject: `Portfolio · ${subject}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          ...(company ? [`Company: ${company}`] : []),
          "",
          message,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(8_000),
    });
    if (response.ok) {
      const result: unknown = await response.json();
      if (
        typeof result === "object" &&
        result !== null &&
        "id" in result &&
        typeof result.id === "string" &&
        result.id
      ) {
        return {
          state: "sent",
          message: "Your message was accepted for delivery.",
        };
      }
    }
  } catch {
    // Provider and rate-limit failures share a safe fallback without leaking details.
  }
  return error("Delivery could not be confirmed. Please email me directly.");
}
