import { GITHUB_USERNAME, CACHE_TTL } from "../config/index.js";
import {
  getContributedRepos,
  getContributionCalendar,
  getGitHubProfileAndRepos,
  getContributionYears,
} from "./github.service.js";

export const cache = new Map();

export async function updateAllCaches() {
  console.log("[Cache] Starting background cache refresh...");
  const now = Date.now();

  try {
    const repos = await getContributedRepos(GITHUB_USERNAME);
    cache.set("contributed-repos", {
      data: repos,
      timestamp: now,
    });
    console.log("[Cache] Successfully refreshed contributed-repos.");
  } catch (err) {
    console.error("[Cache] Error refreshing contributed-repos:", err.message);
  }

  let years = [];
  try {
    const { days: contributions, totalContributionsText } = await getContributionCalendar(GITHUB_USERNAME, "");
    const { stats, langs, repos } = await getGitHubProfileAndRepos(GITHUB_USERNAME);
    const fetchedYears = await getContributionYears(GITHUB_USERNAME);
    years = fetchedYears || [];

    const result = {
      contributions,
      totalContributionsText,
      stats,
      langs,
      repos,
      years,
    };

    cache.set("current", {
      data: result,
      timestamp: now,
    });
    console.log("[Cache] Successfully refreshed main github data.");
  } catch (err) {
    console.error("[Cache] Error refreshing main github data:", err.message);
  }

  for (const year of years) {
    if (!year) continue;
    try {
      const { days: contributions, totalContributionsText } = await getContributionCalendar(GITHUB_USERNAME, year);
      const { stats, langs, repos } = await getGitHubProfileAndRepos(GITHUB_USERNAME);

      const result = {
        contributions,
        totalContributionsText,
        stats,
        langs,
        repos,
        years,
      };

      cache.set(year, {
        data: result,
        timestamp: now,
      });
      console.log(`[Cache] Successfully refreshed github data for year ${year}.`);
    } catch (err) {
      console.error(`[Cache] Error refreshing github data for year ${year}:`, err.message);
    }
  }

  console.log("[Cache] Background cache refresh complete.");
}

export function startBackgroundWorker() {
  updateAllCaches();
  setInterval(updateAllCaches, CACHE_TTL);
}
