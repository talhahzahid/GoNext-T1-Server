import express from "express";
import { createTask } from "../controllers/task.controllers.js  ";
const router = express.Router();

router.post("/createtask", createTask);

export default router;
