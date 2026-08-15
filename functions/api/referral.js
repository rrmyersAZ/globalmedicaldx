import {
  isSameOrigin,
  jsonResponse,
  sendEmail,
} from "../_lib/resend.js";

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== "POST") {
    return jsonResponse({ error: "method_not_allowed" }, 405);
  }

  if (!isSameOrigin(request)) {
    return jsonResponse({ error: "forbidden" }, 403);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "invalid_json" }, 400);
  }

  const name = String(payload.name || "").trim();
  const phone = String(payload.phone || "").trim();
  const email = String(payload.email || "").trim();
  const indication = String(payload.indication || "").trim();
  const payment = String(payload.payment || "").trim();
  const demographics = String(payload.demographics || "").trim();
  const history = String(payload.history || "").trim();

  if (!name || !phone || !indication || !payment) {
    return jsonResponse({ error: "missing_fields" }, 400);
  }

  const text = [
    "Referral / appointment request from the Global Medical Diagnostics website.",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email || "Not provided"}`,
    `Clinical indication: ${indication}`,
    `Payment preference: ${payment}`,
    `Demographics / patient notes: ${demographics || "Not provided"}`,
    `Relevant history: ${history || "Not provided"}`,
  ].join("\n");

  const message = {
    from: env.FROM_EMAIL,
    to: [env.INBOX_FORWARD_TO],
    subject: `CPET referral — ${name}`,
    text,
  };
  if (email) message.reply_to = [email];

  try {
    await sendEmail(env, message);
  } catch (error) {
    const status = error.message === "missing_resend_key" ? 500 : 502;
    return jsonResponse({ error: "send_failed" }, status);
  }

  return jsonResponse({ ok: true });
}
