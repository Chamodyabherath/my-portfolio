export function contactConfiguration() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  return apiKey && from && redisUrl && redisToken
    ? { apiKey, from, redisUrl, redisToken }
    : null;
}

export function isContactConfigured() {
  return Boolean(contactConfiguration());
}
