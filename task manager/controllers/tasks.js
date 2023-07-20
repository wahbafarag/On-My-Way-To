const Task = require("../models/task");
const asyncWrapper = require("../middlewares/handleAsync");
const { CustomErrors, createCustomError } = require("../errors/customErrors");

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(200).json({ msg: "Task Created", task });
});

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  if (!tasks)
    return res.status(404).json({ msg: "No tasks for today ,Congrats!" });
  res.status(200).json({ tasks });
  // res.status(200).json({ tasks });
  // res.status(200).json({ tasks, amount: tasks.length });
  // res.status(200).json({ success: true, data: { tasks } });
  // res
  //   .status(200)
  //   .json({ status: "success", data: { tasks, nbHits: tasks.length } });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById({ _id: id });

  if (!task) {
    return next(createCustomError("Task not found", 404));
    //
    // const error = new Error("Task not found");
    // error.status(404);
    // return next(error);
    //
    // return res.status(404).json({ msg: "Task not found" });
  }
  res.status(200).json({ msg: "Getting Your Task", task });
});

const updateTask = asyncWrapper(async (req, res) => {
  //const { id } = req.params;
  const task = await Task.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError("Update failed , Task not found", 404));
  }
  res.status(200).json({ msg: "Updating Task", task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete({ _id: id });
  if (!task) {
    return next(createCustomError("Task not found , Can not delete it ", 404));
    //return res.status(404).json({ msg: "Task not found , Can not delete it " });
  }

  res.status(200).json({ msg: "Task Deleted ", task });
});

module.exports = { createTask, getTask, getAllTasks, updateTask, deleteTask };
