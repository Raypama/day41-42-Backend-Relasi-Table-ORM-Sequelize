const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const verify = require("../middlewares/auth");

router.post("/login", authController.login);
router.get("/check", verify, authController.check);

module.exports = router;
