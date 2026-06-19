import express from "express";
import { getGitHubData, getContributedReposData } from "../controllers/github.controller.js";

const router = express.Router();

router.get("/github", getGitHubData);
router.get("/contributed-repos", getContributedReposData);

export default router;
