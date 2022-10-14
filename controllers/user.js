const User = require("../models/userSchema")
const taskSchema = require("../models/taskSchema")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = "8527dcdbdyuqcdfbvhjfb"
exports.signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const compare1 = await User.exists({ email: email })
        const emailAddr = /^\S+@\S+\.\S+$/.test(email)

        if (!emailAddr) {
            return res.status(400).json({
                status: "Error",
                message: "Invalid Email Address"
            })
        }
        if (compare1) {
            res.json({
                "error": "404",
                "msg": "user already exist"
            })
        }
        else {

            let encryptedPassword = await bcrypt.hash(password, 10)
            let finalUser = new User({
                name: name,
                email: email,
                password: encryptedPassword
            })
            finalUser.save()
            res.json({
                "msg": "User singed up",
                name: finalUser.name,
                email: finalUser.email,
                id: finalUser._id
            })
        }


    }
    catch (e) {
        next(e)
    }
}
exports.signin = async (req, res, next) => {
    const { email, password } = req.body
    try {

        const user = await User.findOne({ email: email })
        if (!user) {
            res.status(404).json({
                "status": "error",
                "msg": "email not exist"
            })
        }
        else {
            await bcrypt.compare(password, user.password, async function (err, isMatch) {
                if (err) {
                    res.json({
                        "error": err
                    })
                } else {
                    if (!isMatch) {
                        res.status(400).json({
                            "msg": "please check your password"
                        })
                    }
                    else if (isMatch) {
                        const token = jwt.sign(
                            {
                                id: user._id,
                            },
                            secretKey
                        );
                        await User.findOneAndUpdate({ id: user._id }, { $set: { jwtToken: token } })
                        const loggedInUserDetails = {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                        }
                        return res.status(200).json({
                            msg: "logged in",
                            status: 'ok',
                            loggedInUserDetails,
                            token: token
                        })
                    }
                }
            })
        }
    } catch (e) {
        next(e)
    }
}

exports.taskOfAUser = async (req, res, next) => {
    try {
        const results = await taskSchema.find({ userId: req.user._id })
        console.log("hey")
        return res.status(200).json({
            "msg": "done",
            results: results
        })
    } catch (e) {
        next(e)
    }

}

exports.getUserById = async (req, res, next) => {
    try {
        return res.status(200).json({
            "msg": "success",
            user: req.user
        })
    } catch (e) {
        next(e)
    }

}