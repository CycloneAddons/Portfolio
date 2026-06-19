import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3001;
export const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "CycloneAddons";
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN || null;
export const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || null;
export const CACHE_TTL = 30 * 60 * 1000;
export const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
export const MAX_REQUESTS = 3;
