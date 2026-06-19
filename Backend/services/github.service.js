import axios from "axios";
import * as cheerio from "cheerio";
import { GITHUB_TOKEN } from "../config/index.js";

export async function getContributionCalendar(username, year) {
  let url = `https://github.com/users/${username}/contributions`;
  if (year) {
    url += `?from=${year}-01-01&to=${year}-12-31`;
  }
  const response = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });

  const $ = cheerio.load(response.data);
  const days = [];

  $(".ContributionCalendar-day").each((idx, el) => {
    const date = $(el).attr("data-date");
    const levelStr = $(el).attr("data-level");

    if (date) {
      const level = parseInt(levelStr || "0", 10);
      days.push({
        date,
        level,
      });
    }
  });

  days.sort((a, b) => new Date(a.date) - new Date(b.date));

  const text = $(".js-yearly-contributions h2").text().trim().replace(/\s+/g, " ");
  const totalContributionsText = text
    .replace("in the last year", "· last year")
    .replace(/in (\d{4})/, "· $1") || "contributions";

  return {
    days,
    totalContributionsText,
  };
}

export async function fetchTopLanguages(username) {
  const token = GITHUB_TOKEN;
  if (!token) {
    console.warn("[Languages] No GITHUB_TOKEN set — falling back to empty langs.");
    return [];
  }

  const query = `
    query userInfo($login: String!) {
      user(login: $login) {
        repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
          nodes {
            name
            languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
              edges {
                size
                node {
                  color
                  name
                }
              }
            }
          }
        }
      }
    }
  `;

  const res = await axios.post(
    "https://api.github.com/graphql",
    { query, variables: { login: username } },
    { headers: { Authorization: `token ${token}` } }
  );

  if (res.data.errors) {
    console.error("[Languages] GraphQL errors:", res.data.errors);
    return [];
  }

  const repoNodes = res.data.data.user.repositories.nodes;

  const langMap = {};
  for (const repo of repoNodes) {
    for (const edge of repo.languages.edges) {
      const name = edge.node.name;
      const color = edge.node.color;
      if (langMap[name]) {
        langMap[name].size += edge.size;
      } else {
        langMap[name] = { name, color, size: edge.size };
      }
    }
  }

  const sorted = Object.values(langMap)
    .sort((a, b) => b.size - a.size);

  const totalSize = sorted.reduce((sum, l) => sum + l.size, 0);

  return sorted.map((l) => [
    l.name,
    parseFloat(((l.size / totalSize) * 100).toFixed(2)),
    l.color || "#4f8cff",
  ]);
}

export async function getGitHubProfileAndReposRest(username) {
  const headers = {};
  if (GITHUB_TOKEN) {
    headers.Authorization = `token ${GITHUB_TOKEN}`;
  }

  const profileRes = await axios.get(`https://api.github.com/users/${username}`, { headers });
  const reposRes = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`, { headers });

  const profile = profileRes.data;
  const repos = reposRes.data;

  const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
  const langs = await fetchTopLanguages(username);

  const topRepos = repos
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    .slice(0, 4)
    .map((repo) => ({
      name: repo.name,
      description: repo.description || "",
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      language: repo.language || "",
      html_url: repo.html_url || "#",
      type: repo.fork ? "fork" : "owner",
      isFork: repo.fork,
    }));

  return {
    stats: {
      followers: profile.followers || 0,
      publicRepos: profile.public_repos || 0,
      stars: totalStars,
    },
    langs,
    repos: topRepos,
  };
}

export async function getGitHubProfileAndRepos(username) {
  const token = GITHUB_TOKEN;
  if (!token) {
    console.warn("[GitHub API] No GITHUB_TOKEN set — falling back to REST API.");
    return getGitHubProfileAndReposRest(username);
  }

  try {
    const query = `
      query userInfo($login: String!) {
        user(login: $login) {
          followers {
            totalCount
          }
          repositories(ownerAffiliations: OWNER, first: 100) {
            totalCount
            nodes {
              name
              owner { login }
              description
              stargazerCount
              forkCount
              primaryLanguage { name color }
              url
              isFork
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    color
                    name
                  }
                }
              }
            }
          }
        }
      }
    `;

    const res = await axios.post(
      "https://api.github.com/graphql",
      { query, variables: { login: username } },
      { headers: { Authorization: `token ${token}` } }
    );

    if (res.data.errors) {
      console.error("[GitHub API] GraphQL errors:", res.data.errors);
      throw new Error("GraphQL query failed");
    }

    const user = res.data.data.user;
    if (!user) {
      throw new Error(`User ${username} not found`);
    }

    const ownReposNodes = user.repositories.nodes || [];
    const totalStars = ownReposNodes.reduce((sum, repo) => sum + (repo.stargazerCount || 0), 0);
    const stats = {
      followers: user.followers?.totalCount || 0,
      publicRepos: user.repositories?.totalCount || 0,
      stars: totalStars,
    };

    const langMap = {};
    for (const repo of ownReposNodes) {
      if (repo.isFork) continue;
      if (repo.languages && repo.languages.edges) {
        for (const edge of repo.languages.edges) {
          const name = edge.node.name;
          const color = edge.node.color;
          if (langMap[name]) {
            langMap[name].size += edge.size;
          } else {
            langMap[name] = { name, color, size: edge.size };
          }
        }
      }
    }
    const sortedLangs = Object.values(langMap).sort((a, b) => b.size - a.size);
    const totalSize = sortedLangs.reduce((sum, l) => sum + l.size, 0);
    const langs = sortedLangs.map((l) => [
      l.name,
      parseFloat(((l.size / totalSize) * 100).toFixed(2)),
      l.color || "#4f8cff",
    ]);

    const repos = ownReposNodes
      .filter((node) => !node.isFork)
      .sort((a, b) => (b.stargazerCount || 0) - (a.stargazerCount || 0))
      .slice(0, 4)
      .map((repo) => ({
        name: repo.name,
        description: repo.description || "",
        stars: repo.stargazerCount || 0,
        forks: repo.forkCount || 0,
        language: repo.primaryLanguage?.name || "",
        html_url: repo.url || "#",
        type: "owner",
        isFork: false,
      }));

    return {
      stats,
      langs,
      repos,
    };

  } catch (error) {
    console.error("[GitHub API] GraphQL failed, falling back to REST API:", error.message);
    return getGitHubProfileAndReposRest(username);
  }
}

export async function getContributionYears(username) {
  const token = GITHUB_TOKEN;
  if (token) {
    try {
      const query = `
        query userInfo($login: String!) {
          user(login: $login) {
            contributionsCollection {
              contributionYears
            }
          }
        }
      `;
      const res = await axios.post(
        "https://api.github.com/graphql",
        { query, variables: { login: username } },
        { headers: { Authorization: `token ${token}` } }
      );
      if (!res.data.errors) {
        const years = res.data.data.user.contributionsCollection.contributionYears;
        if (years && years.length > 0) {
          return ["", ...years.map(y => String(y))];
        }
      }
    } catch (e) {
      console.warn("[Years] GraphQL fetch failed, falling back to scraping:", e.message);
    }
  }

  try {
    const url = `https://github.com/${username}?action=show&controller=profiles&tab=contributions&user_id=${username}`;
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    const $ = cheerio.load(response.data);
    const years = new Set();
    $("a").each((i, el) => {
      const text = $(el).text().trim();
      if (/^\d{4}$/.test(text)) {
        years.add(text);
      }
    });

    if (years.size > 0) {
      const sortedYears = Array.from(years).sort((a, b) => b - a);
      return ["", ...sortedYears];
    }
  } catch (e) {
    console.error("[Years] Scraping failed:", e.message);
  }

  const currentYear = new Date().getFullYear();
  const fallback = [""];
  for (let y = currentYear; y >= 2021; y--) {
    fallback.push(String(y));
  }
  return fallback;
}

export async function getContributedRepos(username) {
  const token = GITHUB_TOKEN;
  if (!token) {
    console.warn("[Contributed Repos] No GITHUB_TOKEN set.");
    return [];
  }

  const query = `
    query userMergedPRs($login: String!) {
      user(login: $login) {
        mergedPRs: pullRequests(first: 100, states: [MERGED], orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            repository {
              name
              owner { login }
              description
              stargazerCount
              forkCount
              primaryLanguage { name color }
              url
            }
          }
        }
      }
    }
  `;

  const res = await axios.post(
    "https://api.github.com/graphql",
    { query, variables: { login: username } },
    { headers: { Authorization: `token ${token}` } }
  );

  if (res.data.errors) {
    console.error("[Contributed Repos] GraphQL errors:", res.data.errors);
    throw new Error("GraphQL query failed");
  }

  const user = res.data.data.user;
  if (!user) {
    return [];
  }

  const mergedPRNodes = user.mergedPRs?.nodes || [];
  const repoMap = new Map();

  for (const node of mergedPRNodes) {
    const repo = node.repository;
    if (!repo) continue;

    if (repo.owner?.login === username) continue;

    if (repo.name.toLowerCase() === "register") continue;

    const lowerName = repo.name.toLowerCase();
    if (!repoMap.has(lowerName)) {
      repoMap.set(lowerName, {
        name: repo.name,
        owner: repo.owner?.login || "",
        description: repo.description || "",
        stars: repo.stargazerCount || 0,
        forks: repo.forkCount || 0,
        language: repo.primaryLanguage?.name || "",
        html_url: repo.url,
        type: "contributed",
      });
    }
  }

  return Array.from(repoMap.values()).sort((a, b) => b.stars - a.stars);
}
