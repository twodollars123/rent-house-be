//khai báo router của express
const express = require("express");
const router = express.Router();

const accessRouter = require("./access");
const productRouter = require("./product");
const { apiKey, permission } = require("../auth/checkAuth");

//check apikey
router.use(apiKey);
//check permissions
router.use(permission("1111"));

router.use("/v1/api", accessRouter);
router.use("/v1/api", productRouter);

module.exports = router;
