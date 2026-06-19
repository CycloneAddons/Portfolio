import express from "express";
import githubRouter from "./github.routes.js";
import contactRouter from "./contact.routes.js";

const router = express.Router();

router.use(githubRouter);
router.use(contactRouter);

export default router;
