// In-memory rate limiting map
const contactRateLimit = new Map();
const MAX_CONTACT_PER_WINDOW = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function getClientIp(event) {
  const forwarded = event.headers['x-forwarded-for'] || event.headers['client-ip'];
  return forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';
}

function sanitizeString(str, maxLength = 500) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/[&<>"'/]/g, (s) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;'
    }[s]))
    .trim()
    .slice(0, maxLength);
}

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const clientIp = getClientIp(event);
  const now = Date.now();
  const rateRecord = contactRateLimit.get(clientIp) || { count: 0, resetAt: now + WINDOW_MS };

  if (now > rateRecord.resetAt) {
    rateRecord.count = 0;
    rateRecord.resetAt = now + WINDOW_MS;
  }

  if (rateRecord.count >= MAX_CONTACT_PER_WINDOW) {
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({
        error: 'Too many contact messages submitted. Please wait 15 minutes before submitting another note.'
      })
    };
  }

  rateRecord.count += 1;
  contactRateLimit.set(clientIp, rateRecord);

  try {
    const data = JSON.parse(event.body || '{}');

    const name = sanitizeString(data.name || '', 100);
    const email = (data.email || '').trim().toLowerCase();
    const phone = (data.phone || '').replace(/\D/g, '').slice(0, 10);
    const subject = sanitizeString(data.subject || 'General Inquiry', 150);
    const message = sanitizeString(data.message || '', 1000);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || name.length < 2) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Valid name is required.' }) };
    }
    if (!email || !emailRegex.test(email)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Valid email address is required.' }) };
    }
    if (!message || message.length < 5) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Message must be at least 5 characters long.' }) };
    }

    // In production, message can be dispatched via SendGrid / Resend / Webhook
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Your inquiry has been securely received by BUTTER AND BLISS team.'
      })
    };
  } catch {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to process inquiry submission.' })
    };
  }
};
