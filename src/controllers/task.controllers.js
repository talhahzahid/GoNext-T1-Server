import Usertask from "../models/task.models.js";

const createTask = async (req, res) => {
  const { taskname, description } = req.body;
  if (!taskname)
    return res.status(400).json({ message: "Task Name is required" });
  if (!description)
    return res.status(400).json({ message: "Task Description is required" });
  try {
    const task = await Usertask.create({ taskname, description });
    res.status(201).json({ message: "Task Adde Successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error Occurred" });
  }
};

// remove task
const removeTask = async (req, res) => {
  const { id } = req.user;
  try {
    const remove = await Usertask.findByIdAndDelete(id);
    res.status(200).json({ message: "Task Delete Successfully", remove });
  } catch (error) {
    res.status(500).json({ message: "Error Occurred" });
  }
};

// edit task
const updateTask = (req, res) => {};

// All Task
const allTask = async (req, res) => {
  const user = req.user;
  if (!user) return res.status(400).json({ message: "Login First" });
  try {
    const task = await Usertask.find({});
    res.status(200).json({ message: "All Task Fetch", task });
  } catch (error) {
    res.status(500).json({ message: "Error Occurred" });
  }
};

export { createTask, removeTask, updateTask, allTask };
