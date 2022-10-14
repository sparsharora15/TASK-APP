const taskSchema = require("../models/taskSchema")

exports.createTask = async (req, res, next) => {
    try {
        const newTask = new taskSchema({
            userId: req.user._id,
            heading: req.body.heading,
            content: req.body.content
        })
        await newTask.save()
        res.json({
            "msg": "Task added",
            newTask: newTask
        })
    }
    catch (e) {
        next(e)
    }

}
exports.updateTask = async (req, res, next) => {
    try {
        const { id } = req.body
        await taskSchema.findByIdAndUpdate(id, req.body)
        res.json({
            "msg": "Task updated"
        })

    }
    catch (e) {
        next(e)
    }
}

exports.deleteTask = async (req, res ,next) => {
    try {
        const { id } = req.body
        await taskSchema.findByIdAndDelete(id)
        res.json({
            "msg": "Task deleted"
        })
    }
    catch (e) {
        next(e)
    }

}
