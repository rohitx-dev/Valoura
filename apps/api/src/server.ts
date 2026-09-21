import express from "express";
import { env } from "./env.js";
import { requestId } from "./middleware/request-id.js";
import { notFound } from "./middleware/not-found.js";
import { errorHandler } from "./middleware/error-handler.js";

const app = express();

app.use(requestId);
app.use(express.json({ limit: "100kb" }));

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "valoura-api",
  });
});

// Add application routes above these handlers.
app.use(notFound);
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});