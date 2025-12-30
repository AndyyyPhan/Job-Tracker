import express from "express";
import { getJobs, addJob, updateJob, deleteJob } from "../controllers/jobsController.js";
import { requireAuth } from "../middleware/requireAuth.js";

export const jobsRouter = express.Router();

jobsRouter.use(requireAuth);

jobsRouter.get("/", getJobs);
jobsRouter.post("/", addJob);
jobsRouter.put("/:id", updateJob);
jobsRouter.delete("/:id", deleteJob);
