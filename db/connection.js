const mongoose = require('mongoose');

const connectionUrl = "mongodb+srv://sparsharora:sparsharora15@cluster0.qcpeol2.mongodb.net/?retryWrites=true&w=majority"

exports.connect = async () => {
    try {
        await mongoose.connect(connectionUrl)
        console.log("Connected to DB")
    }
    catch (e) {
        console.log(e)
    }
}