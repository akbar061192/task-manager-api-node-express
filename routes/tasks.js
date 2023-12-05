const express = require("express");
const {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");
const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.get("/:id", getTaskById);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

// router.route("/").get(getTasks).post(createTask);
// router.route("/:id").get(getTaskById).patch(updateTask).delete(deleteTask);

module.exports = router;
