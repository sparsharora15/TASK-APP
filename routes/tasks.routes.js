const { createTask, updateTask, deleteTask } = require('../controllers/tasks')
const { authUser } = require('../middlewares/userAuth')
const express = require("express")
const router = express.Router();
router.post('/create', authUser, createTask)
router.post('/updateTask', authUser, updateTask)
router.post('/deleteTask', authUser, deleteTask)
module.exports = router;
