//khai báo router của express
const express = require("express");
const router = express.Router();

const accessRouter = require("./access");

//check apikey

router.use("/v1/api", accessRouter);

module.exports = router;
