import mongoose from "mongoose";

const userTask = new mongoose.Schema(
  {
    taskname: {
      type: String,
      reuired: true,
    },
    description: {
      type: String,
      reuired: true,
    },
    status: {
      type: String,
      enum: ["pending", "done"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Usertask", userTask);
