import express from "express";
import { getStatuses } from "../controllers/statusesController.js";

export const statusesRouter = express.Router();

statusesRouter.get("/", getStatuses);
