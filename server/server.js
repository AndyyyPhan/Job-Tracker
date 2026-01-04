import express from "express";
import cors from "cors";
import { jobsRouter } from "./routes/jobs.js";
import { authRouter } from "./routes/auth.js";
import { meRouter } from "./routes/me.js";
import { statusesRouter } from "./routes/statuses.js";
import session from "express-session";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  })
);
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/jobs", jobsRouter);
app.use("/api/auth/me", meRouter);
app.use("/api/auth", authRouter);
app.use("/api/statuses", statusesRouter);

if (process.env.VERCEL !== "1") {
  app
    .listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    })
    .on("error", (err) => {
      console.error("Failed to start server:", err);
    });
}
