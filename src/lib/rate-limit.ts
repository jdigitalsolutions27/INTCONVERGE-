type Bucket = {
  count: number;
  start: number;
};

const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const bucket = buckets.get(key) || { count: 0, start: now };

  if (now - bucket.start > windowMs) {
    buckets.set(key, { count: 1, start: now });
    return { ok: true } as const;
  }

  if (bucket.count >= limit) {
    return { ok: false, retryIn: windowMs - (now - bucket.start) } as const;
  }

  bucket.count += 1;
  buckets.set(key, bucket);
  return { ok: true } as const;
}

