const {signup , signin ,taskOfAUser,getUserById}  = require('../controllers/user')
const {authUser} = require('../middlewares/userAuth')
const express = require("express")
const router = express.Router();
router.post("/signup" , signup)
router.post("/signin" , signin)
router.get("/getUserById" ,authUser, getUserById)
router.get("/taskOfAUser" ,authUser,taskOfAUser)
module.exports = router;