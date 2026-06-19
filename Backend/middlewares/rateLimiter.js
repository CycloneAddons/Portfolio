import { RATE_LIMIT_WINDOW, MAX_REQUESTS } from "../config/index.js";

const contactIpCache = new Map();

export const contactRateLimiter = (req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const now = Date.now();

  if (!contactIpCache.has(ip)) {
    contactIpCache.set(ip, []);
  }

  const timestamps = contactIpCache.get(ip);
  const activeTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);

  if (activeTimestamps.length >= MAX_REQUESTS) {
    const oldestTimestamp = activeTimestamps[0];
    const timeRemaining = Math.ceil((RATE_LIMIT_WINDOW - (now - oldestTimestamp)) / 1000 / 60);
    return res.status(429).json({
      error: `Too many messages. Please try again in ${timeRemaining} minute(s).`
    });
  }

  activeTimestamps.push(now);
  contactIpCache.set(ip, activeTimestamps);
  next();
};

setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of contactIpCache.entries()) {
    const active = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);
    if (active.length === 0) {
      contactIpCache.delete(ip);
    } else {
      contactIpCache.set(ip, active);
    }
  }
}, 60 * 60 * 1000);
