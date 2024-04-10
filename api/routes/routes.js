const express=require('express');
const router = express.Router();
const {
    createTask,
    updateTask,
    deleteTask,
    viewTask,
    allTasks
}=require('../controller/controllers')

router.route('/create-task').post(createTask)
router.route('/update-task').post(updateTask)
router.route('/delete-task/:taskId').delete(deleteTask)
router.route('/view-task/:taskId').get(viewTask)
router.route('/view-all-tasks').get(allTasks)

module.exports = router;

/*************************************************************************************** */

// Another Idea

// const express = require("express");
// const router = express.Router();

// const {
//   createTask,
//   updateTask,
//   deleteTask,
//   viewTask,
//   allTask,
//   setTaskTimer,
// } = require("../controller/controllers");

// router.route("/create-task").post(createTask);
// router.route("/update-task").post(updateTask);
// router.route("/delete-task/:taskId").delete(deleteTask);
// router.route("/view-task/:taskId").get(viewTask);
// router.route("/view-all-task").get(allTask);
// router.route("/settimer/:taskId").get(setTaskTimer);

// module.exports = router;