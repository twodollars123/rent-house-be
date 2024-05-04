const Router = require("express").Router();
const { asyncHandler } = require("../../helpers/asyncHandler.helper");
const orderController = require("../../controllers/order.controller");

Router.post("/order/create", asyncHandler(orderController.createOrder));
Router.post(
  "/order/updateStatus",
  asyncHandler(orderController.updateStatusProcess)
);
Router.post(
  "/order/getHistory",
  asyncHandler(orderController.getAllHistoryUpdated)
);

module.exports = Router;
