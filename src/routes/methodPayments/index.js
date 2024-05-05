const Router = require("express").Router();
const methodPaymentsController = require("../../controllers/methodPayments.controller");
const { asyncHandler } = require("../../helpers/asyncHandler.helper");

Router.post(
  "/methodpayments/add",
  asyncHandler(methodPaymentsController.addMapping)
);
Router.get(
  "/methodpayments/getinfo/:prodid",
  asyncHandler(methodPaymentsController.getInfoPaymentMethod)
);

module.exports = Router;
