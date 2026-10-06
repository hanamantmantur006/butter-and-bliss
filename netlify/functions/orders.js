import crypto from 'node:crypto';

// In-memory rate limiting map
const orderRateLimit = new Map();
const MAX_ORDERS_PER_WINDOW = 10;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function getClientIp(event) {
  const forwarded = event.headers['x-forwarded-for'] || event.headers['client-ip'];
  return forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';
}

function sanitizeString(str, maxLength = 300) {
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
  const rateRecord = orderRateLimit.get(clientIp) || { count: 0, resetAt: now + WINDOW_MS };

  if (now > rateRecord.resetAt) {
    rateRecord.count = 0;
    rateRecord.resetAt = now + WINDOW_MS;
  }

  if (rateRecord.count >= MAX_ORDERS_PER_WINDOW) {
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({
        error: 'Order dispatch rate limit exceeded. Please wait a few moments before placing another order.'
      })
    };
  }

  rateRecord.count += 1;
  orderRateLimit.set(clientIp, rateRecord);

  try {
    const data = JSON.parse(event.body || '{}');

    // Input Validation & Sanitization
    const customerName = sanitizeString(data.customerName || data.fullName || '', 100);
    const mobile = (data.mobile || '').replace(/\D/g, '').slice(0, 10);
    const email = sanitizeString(data.email || '', 100);
    const address = sanitizeString(data.address || '', 200);
    const city = sanitizeString(data.city || 'Bengaluru', 50);
    const pincode = (data.pincode || '').replace(/\D/g, '').slice(0, 6);
    const deliveryType = data.deliveryType === 'Store Pickup' ? 'Store Pickup' : 'Home Delivery';
    const timeSlot = sanitizeString(data.timeSlot || 'Standard Delivery', 50);
    const instructions = sanitizeString(data.instructions || '', 300);
    const paymentMethod = ['UPI', 'Razorpay Online', 'Cash on Delivery'].includes(data.paymentMethod)
      ? data.paymentMethod
      : 'UPI';

    if (!customerName || customerName.length < 2) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Valid customer name is required.' }) };
    }
    if (mobile.length !== 10) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'A valid 10-digit mobile number is required.' }) };
    }
    if (deliveryType === 'Home Delivery' && (!address || pincode.length !== 6)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Address and valid 6-digit PIN code are required for home delivery.' }) };
    }

    const rawItems = Array.isArray(data.items) ? data.items : (Array.isArray(data.cartItems) ? data.cartItems : []);
    if (rawItems.length === 0) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Cart cannot be empty.' }) };
    }

    // Authoritative Server-side total calculation
    let subtotal = 0;
    const sanitizedItems = rawItems.map((item) => {
      const quantity = Math.max(1, Math.min(50, parseInt(item.quantity, 10) || 1));
      const unitPrice = Math.max(1, parseInt(item.unitPrice, 10) || 0);
      const total = quantity * unitPrice;
      subtotal += total;
      return {
        name: sanitizeString(item.name || 'Item', 100),
        size: sanitizeString(item.size || item.optionLabel || '1 pc', 50),
        quantity,
        unitPrice,
        total
      };
    });

    const discount = Math.max(0, parseInt(data.discount, 10) || 0);
    const deliveryFee = deliveryType === 'Store Pickup' ? 0 : (subtotal >= 500 ? 0 : 50);
    const finalTotal = Math.max(0, subtotal - discount + deliveryFee);

    // Cryptographic Passkey & Checksum Generation
    const randomOrderId = `BNB-2026-${crypto.randomInt(1000, 9999)}`;
    const custKey = `pass_${crypto.randomBytes(8).toString('hex')}`;

    const checksumPayload = [
      randomOrderId,
      mobile,
      finalTotal,
      subtotal,
      JSON.stringify(sanitizedItems.map(i => ({ name: i.name, q: i.quantity, p: i.unitPrice }))),
      address,
      city
    ].join('|');

    const orderIntegrityHash = crypto.createHash('sha256').update(checksumPayload).digest('hex');

    const finalizedOrder = {
      orderId: randomOrderId,
      date: new Date().toISOString().split('T')[0],
      customerName,
      mobile,
      email,
      address,
      city,
      pincode,
      deliveryType,
      timeSlot,
      status: 'Order Received',
      items: sanitizedItems,
      subtotal,
      deliveryFee,
      discount,
      finalTotal,
      paymentMethod,
      instructions,
      custKey,
      orderIntegrityHash
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        orderId: randomOrderId,
        orderIntegrityHash,
        custKey,
        finalTotal,
        subtotal,
        order: finalizedOrder
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Order processing failed. Please verify input data.' })
    };
  }
};
