const express =require('express');
const router = express.Router();
const pool =require("../sql/connections")
const signinController =require("../controllers/signin")

router.post("/", signinController.signin);

module.exports = router;
