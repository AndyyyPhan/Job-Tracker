import express from "express";
import cors from "cors";
import { jobsRouter } from "./routes/jobs.js";
// import session from "express-session";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

app.use("/api/jobs", jobsRouter);

app
  .listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error("Failed to start server:", err);
  });
