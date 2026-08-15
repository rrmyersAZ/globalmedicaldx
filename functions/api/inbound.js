import {
  attachmentsForForward,
  getReceivedEmail,
  jsonResponse,
  readJsonBody,
  sendEmail,
  shouldSkipForward,
  verifyResendWebhook,
} from "../_lib/resend.js";

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== "POST") {
    return jsonResponse({ error: "method_not_allowed" }, 405);
  }

  let raw;
  let event;
  try {
    const body = await readJsonBody(request);
    raw = body.raw;
    event = body.data;
  } catch {
    return jsonResponse({ error: "invalid_payload" }, 400);
  }

  try {
    await verifyResendWebhook(request, raw, env.RESEND_WEBHOOK_SECRET);
  } catch {
    return jsonResponse({ error: "unauthorized" }, 401);
  }

  if (event.type !== "email.received") {
    return jsonResponse({ ok: true, ignored: true });
  }

  const emailId = event.data && event.data.email_id;
  if (!emailId) {
    return jsonResponse({ error: "missing_email_id" }, 400);
  }

  let received;
  try {
    received = await getReceivedEmail(env, emailId);
  } catch {
    return jsonResponse({ error: "lookup_failed" }, 502);
  }

  if (shouldSkipForward(received.from, env.INBOX_FORWARD_TO)) {
    return jsonResponse({ ok: true, skipped: true });
  }

  let attachments = [];
  try {
    attachments = await attachmentsForForward(env, emailId);
  } catch {
    attachments = [];
  }

  const message = {
    from: env.FROM_EMAIL,
    to: [env.INBOX_FORWARD_TO],
    subject: received.subject || "(no subject)",
    html: received.html || undefined,
    text: received.text || undefined,
    reply_to: received.from ? [received.from] : undefined,
  };
  if (attachments.length) message.attachments = attachments;
  if (!message.html && !message.text) {
    message.text =
      "A message was received at info@globalmedicaldx.com with no readable body.";
  }

  try {
    await sendEmail(env, message);
  } catch {
    return jsonResponse({ error: "forward_failed" }, 502);
  }

  return jsonResponse({ ok: true });
}
