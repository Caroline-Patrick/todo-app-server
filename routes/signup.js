const express =require('express');
const router = express.Router();
const pool =require("../sql/connections")
const signupController =require("../controllers/signup")

router.post("/", signupController.signup);

module.exports = router;
