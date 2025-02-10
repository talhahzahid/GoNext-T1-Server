import Usertask from "../models/task.models.js";

const createTask = async (req, res) => {
  const { tasktitle, description } = req.body;
  if (!tasktitle) return res.json({ message: "Task Title is required" });
  if (!description)
    return res.json({ message: "Task Description is required" });
  try {
    const task = await Usertask.create({ tasktitle, description });
    res.status(201).json({ message: "Task Adde Successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error Occurred" });
  }
};

// remove task
const removeTask = (req, res) => {};

// edit task
const updateTask = (req, res) => {};

// All Task
const allTask = (req, res) => {};



export { createTask, removeTask, updateTask, allTask };
