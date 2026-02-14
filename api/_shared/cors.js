/**
 * Shared CORS utility for API edge functions.
 * Returns appropriate CORS headers based on request origin.
 */

const ALLOWED_ORIGINS = [
  /^https:\/\/(.*\.)?worldtrade\.app$/,
  /^https:\/\/worldtrade-[a-z0-9]+-[a-z0-9-]+\.vercel\.app$/,
  /^https:\/\/pachelbel23\.github\.io$/,
  /^http:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/,
];

export function getCorsHeaders(request) {
  const origin = request?.headers?.get('origin') || '';
  const isAllowed = ALLOWED_ORIGINS.some(pattern => pattern.test(origin));
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : ALLOWED_ORIGINS[0].source,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'X-Content-Type-Options': 'nosniff',
  };
}

export function handleCorsPreflightIf(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: getCorsHeaders(request) });
  }
  return null;
}
