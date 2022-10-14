const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})
const Task = mongoose.model("Taks", taskSchema)
module.exports = Task