import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./auth/authRoutes.js";
import classRoutes from "./classes/classRoutes.js";
import contentRoutes from "./content/contentRoutes.js";
import { listClasses } from "./classes/classStore.js";
import { getSiteContent } from "./content/siteContentStore.js";
import { connectDatabase, getStorageMode } from "./db/connect.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);
const allowedOrigin = process.env.CLIENT_ORIGIN || "http://localhost:3000";

app.use(
  cors({
    origin: allowedOrigin,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.get("/api/health", (_request, response) => {
  response.json({
    status: "ok",
    storage: getStorageMode(),
  });
});

app.get("/api/site", async (_request, response, next) => {
  try {
    const [siteContent, classes] = await Promise.all([getSiteContent(), listClasses()]);
    response.json({
      siteContent,
      classes,
      storage: getStorageMode(),
    });
  } catch (error) {
    next(error);
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/classes", classRoutes);

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(error.status || 500).json({
    message: error.message || "Something went wrong.",
  });
});

await connectDatabase();

app.listen(port, () => {
  console.log(`Nouri By Morgan API listening on http://localhost:${port} using ${getStorageMode()} storage.`);
});
