import crypto from 'node:crypto';

// In-memory rate limiting map (per serverless instance)
const rateLimitMap = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

const SALT = process.env.ADMIN_PASSWORD_SALT || 'bnb_salt_sec_2026_';
const EXPECTED_HASH = process.env.ADMIN_PASSWORD_HASH || 'c8244272cd0b1716985dfe0f3928206bc22ca7a048fd8f9fb14cba52d36b75ea';
const SESSION_SECRET = process.env.SESSION_SECRET || 'bnb_jwt_super_secure_vault_signature_2026';

function getClientIp(event) {
  const forwarded = event.headers['x-forwarded-for'] || event.headers['client-ip'];
  return forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';
}

function createSignedToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

function verifySignedToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [header, body, signature] = parts;
  const expectedSig = crypto.createHmac('sha256', SESSION_SECRET).update(`${header}.${body}`).digest('base64url');
  if (signature !== expectedSig) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const clientIp = getClientIp(event);
  const now = Date.now();
  const rateData = rateLimitMap.get(clientIp) || { attempts: 0, lockUntil: 0 };

  // Check rate limiting lockout
  if (rateData.lockUntil > now) {
    const remainingSec = Math.ceil((rateData.lockUntil - now) / 1000);
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({
        error: `Too many failed attempts. Security lockout active for ${remainingSec} seconds.`,
        lockout: true,
        remainingSeconds: remainingSec
      })
    };
  }

  // Token Verification Mode (GET or action=verify)
  if (event.httpMethod === 'GET' || (event.queryStringParameters && event.queryStringParameters.action === 'verify')) {
    const authHeader = event.headers['authorization'] || '';
    const token = authHeader.replace(/^Bearer\s+/i, '');
    const verified = verifySignedToken(token);
    if (!verified) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ valid: false, error: 'Session expired or signature invalid.' })
      };
    }
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ valid: true, payload: verified })
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const passcode = (body.passcode || '').trim();

    if (!passcode) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Passcode is required.' }) };
    }

    // Cryptographic Hash Comparison
    const submittedHash = crypto.createHash('sha256').update(`${SALT}${passcode}`).digest('hex');

    if (submittedHash !== EXPECTED_HASH) {
      rateData.attempts += 1;
      const remainingAttempts = Math.max(0, MAX_ATTEMPTS - rateData.attempts);

      if (rateData.attempts >= MAX_ATTEMPTS) {
        rateData.lockUntil = now + LOCKOUT_MS;
        rateData.attempts = 0;
        rateLimitMap.set(clientIp, rateData);
        return {
          statusCode: 429,
          headers,
          body: JSON.stringify({
            error: 'Authentication failed. Account locked for 15 minutes due to excessive failed attempts.',
            lockout: true,
            remainingSeconds: 900
          })
        };
      }

      rateLimitMap.set(clientIp, rateData);
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          error: `Invalid credentials. ${remainingAttempts} attempts remaining before temporary lockout.`,
          remainingAttempts
        })
      };
    }

    // Success: Reset rate limiter and issue cryptographically signed JWT session token
    rateLimitMap.delete(clientIp);
    const expiresAt = now + (4 * 60 * 60 * 1000); // 4 hour validity
    const token = createSignedToken({
      role: 'admin',
      ip: clientIp,
      iat: now,
      exp: expiresAt
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Admin authorization granted.',
        token,
        expiresAt
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server authentication error.' })
    };
  }
};
