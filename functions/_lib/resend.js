const RESEND_API = "https://api.resend.com";
const MAX_JSON_BYTES = 50_000;
const MAX_ATTACHMENT_BYTES = 8_000_000;

export function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export function isSameOrigin(request) {
  const origin = request.headers.get("Origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export async function readJsonBody(request, maxBytes = MAX_JSON_BYTES) {
  const length = Number(request.headers.get("Content-Length") || "0");
  if (length > maxBytes) {
    throw new Error("payload_too_large");
  }
  const text = await request.text();
  if (text.length > maxBytes) {
    throw new Error("payload_too_large");
  }
  return { raw: text, data: text ? JSON.parse(text) : {} };
}

export async function resendRequest(env, path, options = {}) {
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("missing_resend_key");
  }

  const response = await fetch(`${RESEND_API}${path}`, {
    method: options.method || "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error("resend_error");
    error.status = response.status;
    error.payload = payload;
    throw error;
  }
  return payload;
}

export async function sendEmail(env, message) {
  return resendRequest(env, "/emails", {
    method: "POST",
    body: message,
  });
}

export async function getReceivedEmail(env, emailId) {
  return resendRequest(env, `/emails/receiving/${emailId}`);
}

export async function listReceivedAttachments(env, emailId) {
  const payload = await resendRequest(
    env,
    `/emails/receiving/${emailId}/attachments`
  );
  return Array.isArray(payload.data) ? payload.data : [];
}

export async function attachmentsForForward(env, emailId) {
  const listed = await listReceivedAttachments(env, emailId);
  const files = [];
  let total = 0;

  for (const item of listed) {
    if (!item.download_url || !item.filename) continue;
    const downloaded = await fetch(item.download_url);
    if (!downloaded.ok) continue;
    const bytes = new Uint8Array(await downloaded.arrayBuffer());
    total += bytes.length;
    if (total > MAX_ATTACHMENT_BYTES) break;
    files.push({
      filename: item.filename,
      content: bytesToBase64(bytes),
      content_type: item.content_type || undefined,
      content_id: item.content_id || undefined,
    });
  }

  return files;
}

export async function verifyResendWebhook(request, rawBody, secret) {
  if (!secret) {
    throw new Error("missing_webhook_secret");
  }

  const id = request.headers.get("svix-id") || "";
  const timestamp = request.headers.get("svix-timestamp") || "";
  const signatureHeader = request.headers.get("svix-signature") || "";
  if (!id || !timestamp || !signatureHeader) {
    throw new Error("missing_webhook_headers");
  }

  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || Math.abs(Date.now() / 1000 - ts) > 300) {
    throw new Error("stale_webhook");
  }

  const signedContent = `${id}.${timestamp}.${rawBody}`;
  const secretPart = secret.includes("_") ? secret.split("_").slice(1).join("_") : secret;
  const keyBytes = Uint8Array.from(atob(secretPart), (char) => char.charCodeAt(0));
  const expected = await hmacSha256Base64(keyBytes, signedContent);
  const expectedBytes = Uint8Array.from(atob(expected), (char) => char.charCodeAt(0));

  const candidates = signatureHeader.split(" ").map((part) => part.replace(/^v1,/, ""));
  for (const candidate of candidates) {
    try {
      const candidateBytes = Uint8Array.from(atob(candidate), (char) => char.charCodeAt(0));
      if (timingSafeEqual(expectedBytes, candidateBytes)) return true;
    } catch {
      // Ignore malformed signature fragments.
    }
  }
  throw new Error("invalid_webhook_signature");
}

export function shouldSkipForward(from, inbox) {
  const sender = String(from || "").toLowerCase();
  const dest = String(inbox || "").toLowerCase();
  if (!sender) return false;
  if (dest && sender.includes(dest)) return true;
  if (sender.includes("@globalmedicaldx.com")) return true;
  return false;
}

function bytesToBase64(bytes) {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

async function hmacSha256Base64(keyBytes, message) {
  const key = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message)
  );
  return bytesToBase64(new Uint8Array(signature));
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a[i] ^ b[i];
  }
  return mismatch === 0;
}
