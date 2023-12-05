const Task = require("../models/Task");
const AsyncWrapper = require("../middlewares/AsyncWrapper");
const { createCustomError } = require("../errors/CustomError");

// GET ALL TASKS
// const getTasks = AsyncWrapper(async (req, res) => {
//   try {
//     const tasks = await Task.find({});
//     res.status(200).json({ success: true, tasks });
//   } catch (error) {
//     res.status(500).json({ success: false, error });
//   }
// });

const getTasks = AsyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ success: true, tasks });
});

// CREATING NEW TASK
// const createTask = async (req, res) => {
//   const { name, completed } = req.body;
//   try {
//     const task = await Task.create({ name, completed });
//     res.status(201).json({ success: true, task });
//   } catch (error) {
//     res.status(500).json({ success: false, error });
//   }
// };

const createTask = AsyncWrapper(async (req, res) => {
  const { name, completed } = req.body;
  const task = await Task.create({ name, completed });
  res.status(201).json({ success: true, task });
});

// GET SINGLE TASK BY FILTERING WITH ID
// const getTaskById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const task = await Task.findOne({ _id: id });
//     if (task) {
//       return res.status(200).json({ success: true, task });
//     } else {
//       return res
//         .status(404)
//         .json({ success: false, msg: `No Task with ID ${id}` });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, error });
//   }
// };

const getTaskById = AsyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOne({ _id: id });
  if (task) {
    return res.status(200).json({ success: true, task });
  } else {
    return req.next(createCustomError(`No Task with ID ${id}`, 404));
    // return res
    //   .status(404)
    //   .json({ success: false, msg: `No Task with ID ${id}` });
  }
});

// UPDATE A SINGLE TASK BY ID AND BODY
// const updateTask = async (req, res) => {
//   const { id } = req.params;
//   const { name, completed } = req.body;
//   try {
//     const task = await Task.findOneAndUpdate(
//       { _id: id },
//       { name, completed },
//       { new: true, runValidators: true }
//     );
//     if (task) {
//       return res.status(201).json({ success: true, task });
//     } else {
//       return res
//         .status(404)
//         .json({ success: false, msg: `No Task with ID ${id}` });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, error });
//   }
// };

const updateTask = AsyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { name, completed } = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: id },
    { name, completed },
    { new: true, runValidators: true }
  );
  if (task) {
    return res.status(201).json({ success: true, task });
  } else {
    return req.next(createCustomError(`No Task with ID ${id}`, 404));

    //   return res
    //     .status(404)
    //     .json({ success: false, msg: `No Task with ID ${id}` });
  }
});

// DELETE A SINGLE TASK BY ID
// const deleteTask = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const task = await Task.findOneAndDelete({ _id: id });
//     if (task) {
//       return res.status(200).json({ success: true, task });
//     } else {
//       return res
//         .status(404)
//         .json({ success: false, msg: `No Task with ID ${id}` });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, error });
//   }
// };

const deleteTask = AsyncWrapper(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id });
  if (task) {
    return res.status(200).json({ success: true, task });
  } else {
    return req.next(createCustomError(`No Task with ID ${id}`, 404));

    // return res
    //   .status(404)
    //   .json({ success: false, msg: `No Task with ID ${id}` });
  }
});

module.exports = { getTasks, createTask, getTaskById, updateTask, deleteTask };
