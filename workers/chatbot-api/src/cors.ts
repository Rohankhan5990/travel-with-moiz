/** Allowed browser origins for CORS (preflight + JSON API). */
export const ALLOWED_ORIGINS = new Set([
  "https://www.travelwithmoiz.com",
  "https://travelwithmoiz.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

export function corsHeadersForOrigin(origin: string | null): HeadersInit {
  const allow =
    origin && ALLOWED_ORIGINS.has(origin) ? origin : [...ALLOWED_ORIGINS][0];

  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Requested-With",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}
