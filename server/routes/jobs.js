import express from "express";
import { getJobs, addJob, updateJob, deleteJob } from "../controllers/jobsController.js";

export const jobsRouter = express.Router();

jobsRouter.get("/", getJobs);
jobsRouter.post("/", addJob);
jobsRouter.put("/:id", updateJob);
jobsRouter.delete("/:id", deleteJob);
