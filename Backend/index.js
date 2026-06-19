import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { PORT, GITHUB_USERNAME } from "./config/index.js";
import { startBackgroundWorker } from "./services/cache.service.js";
import apiRouter from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

const frontendDistPath = path.join(__dirname, "../Frontend/dist");
app.use(express.static(frontendDistPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[Express Backend] Server running on http://localhost:${PORT}`);
    console.log(`[Express Backend] Tracking username: ${GITHUB_USERNAME}`);
    startBackgroundWorker();
  });
}

export default app;
