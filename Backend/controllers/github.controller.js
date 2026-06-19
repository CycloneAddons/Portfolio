import { GITHUB_USERNAME, CACHE_TTL } from "../config/index.js";
import { cache } from "../services/cache.service.js";
import {
  getContributionCalendar,
  getGitHubProfileAndRepos,
  getContributionYears,
  getContributedRepos,
} from "../services/github.service.js";

export async function getGitHubData(req, res) {
  const year = req.query.year || "";
  const cacheKey = year || "current";

  const cached = cache.get(cacheKey);
  const now = Date.now();
  if (cached && (now - cached.timestamp < CACHE_TTL)) {
    return res.json(cached.data);
  }

  try {
    const { days: contributions, totalContributionsText } = await getContributionCalendar(GITHUB_USERNAME, year);
    const { stats, langs, repos } = await getGitHubProfileAndRepos(GITHUB_USERNAME);
    const years = await getContributionYears(GITHUB_USERNAME);

    const result = {
      contributions,
      totalContributionsText,
      stats,
      langs,
      repos,
      years,
    };

    cache.set(cacheKey, {
      data: result,
      timestamp: Date.now(),
    });

    res.json(result);
  } catch (error) {
    console.error("Error fetching GitHub details on-demand:", error.message);
    res.status(500).json({ error: "Failed to fetch active data from GitHub. Please try again later." });
  }
}

export async function getContributedReposData(req, res) {
  const cacheKey = "contributed-repos";

  const cached = cache.get(cacheKey);
  const now = Date.now();
  if (cached && (now - cached.timestamp < CACHE_TTL)) {
    return res.json(cached.data);
  }

  try {
    const repos = await getContributedRepos(GITHUB_USERNAME);
    const result = repos;

    cache.set(cacheKey, {
      data: result,
      timestamp: Date.now(),
    });

    res.json(result);
  } catch (error) {
    console.error("Error fetching contributed repos on-demand:", error.message);
    res.status(500).json({ error: "Failed to fetch contributed repositories. Please try again later." });
  }
}
