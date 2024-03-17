const express = require("express");
const router = express.Router();

const accessController = require("../../controllers/access.controller");

router.post("/user/signup", accessController.signup);
router.post("/user/login", accessController.login);

module.exports = router;
