const rateLimitMap = new Map();

export function checkRateLimit(ip, limit = 3, windowMs = 10 * 60 * 1000) {
  const currentTime = Date.now();

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, startTime: currentTime });
    return { success: true };
  }

  const requestData = rateLimitMap.get(ip);

  if (currentTime - requestData.startTime > windowMs) {
    rateLimitMap.set(ip, { count: 1, startTime: currentTime });
    return { success: true };
  }

  if (requestData.count < limit) {
    requestData.count++;
    return { success: true };
  }

  return { success: false };
}