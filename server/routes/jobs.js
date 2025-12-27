import express from "express";
import { getJobs, addJob } from "../controllers/jobsController.js";

export const jobsRouter = express.Router();

jobsRouter.get("/", getJobs);
jobsRouter.post("/", addJob);
