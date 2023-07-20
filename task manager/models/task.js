const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  taskName: {
    type: String,
    required: [true, "Task name is required"],
    trim: true,
    maxLength: [20, "Task name must be less than 20 characters"],
  },
  taskOwner: {  
    type: String,
    required: [true, "Owner name is required"],
    trim: true,
    maxLength: [20, "Your name must be less than 15 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
