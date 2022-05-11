const Task = require("../models/taskModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const getTasks = asyncHandler(async (req, res) => {
  const Tasks = await Task.find({ user: req.user._id }).populate("user");
  res.json(Tasks);
});

const getTaskById = asyncHandler(async (req, res) => {
  const Task = await Task.findById(req.params.id);

  if (Task) {
    res.json(Task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }

  res.json(Task);
});

const CreateTask = asyncHandler(async (req, res) => {
  // console.log(req);
  // console.log(req.user._id);
  const { title, content, category, public, task_status } = req.body;
  console.log("hello from createtask");
  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const newtask = new Task({
      user: req.user._id,
      title,
      content,
      category,
      public,
      task_status,
    });
    // console.log(newtask);
    const createdTask = await newtask.save();
    const useer = await User.findById(req.user._id);
    useer.taskcreated.push(createdTask.id);
    useer.save();
    console.log("user id", req.user._id);
    console.log("task id", createdTask._id);
    User.updateOne(
      { _id: req.user._id },
      {
        $push: { taskcreated: createdTask._id },
      },
      {
        function(error, success) {
          console.log(error);
          console.log(success);
        },
      }
    );
    console.log(createdTask);
    res.status(201).json(createdTask);
  }
});

const DeleteTask = asyncHandler(async (req, res) => {
  const Task = await Task.findById(req.params.id);

  if (Task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (Task) {
    await Task.remove();
    res.json({ message: "Task Removed" });
  } else {
    res.status(404);
    throw new Error("Task not Found");
  }
});

const UpdateTask = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const Task = await Task.findById(req.params.id);

  if (Task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (Task) {
    Task.title = title;
    Task.content = content;
    Task.category = category;

    const updatedTask = await Task.save();
    res.json(updatedTask);
  } else {
    res.status(404);
    throw new Error("Task not found");
  }
});

module.exports = { getTaskById, getTasks, CreateTask, DeleteTask, UpdateTask };
