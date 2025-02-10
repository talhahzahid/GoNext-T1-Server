import express from "express";
import { createTask } from "../controllers/task.controllers.js  ";
import { authenticate } from "../middleware/authorize.middleware.js";
import { allTask } from "../controllers/task.controllers.js";
const router = express.Router();

router.post("/createtask", authenticate, createTask);
router.get  ("/alltask", authenticate, allTask);

export default router;
