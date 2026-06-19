import express from "express";
import { contactRateLimiter } from "../middlewares/rateLimiter.js";
import { handleContactSubmit } from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/contact", contactRateLimiter, handleContactSubmit);

export default router;
