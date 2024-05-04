//khai báo router của express
const express = require("express");
const router = express.Router();

const accessRouter = require("./access");
const productRouter = require("./product");
const commentsRouter = require("./comments");
const userRouter = require("./users");
const invenRouter = require("./inventories");
const methodPaymentsRouter = require("./methodPayments");
const notiRouter = require("./notification");
const { apiKey, permission } = require("../auth/checkAuth");

//check apikey
router.use(apiKey);
//check permissions
router.use(permission("1111"));

router.use("/v1/api", accessRouter);
router.use("/v1/api", productRouter);
router.use("/v1/api", commentsRouter);
router.use("/v1/api", userRouter);
router.use("/v1/api", invenRouter);
router.use("/v1/api", methodPaymentsRouter);
router.use("/v1/api", notiRouter);

module.exports = router;
