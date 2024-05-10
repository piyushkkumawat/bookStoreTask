const express = require("express");
const { signUp, signout, signin } = require("../controller/authController.js");
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signin);
router.post("/signout", signout);

module.exports = router;
