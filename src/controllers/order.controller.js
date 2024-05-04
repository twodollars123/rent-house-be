const { OkResponse, CreatedResponse } = require("../core/success.response");
const orderService = require("../services/order.service");
const { OK } = require("../utils/reasonPhrases");

class OrderController {
  createOrder = async (req, res, next) => {
    new CreatedResponse({
      message: "created new order success",
      metadata: await orderService.createNewOrder(req.body),
    }).send(res);
  };

  updateStatusProcess = async (req, res, next) => {
    new OkResponse({
      message: "updated status success",
      metadata: await orderService.updateStatus(req.body),
    }).send(res);
  };

  getAllHistoryUpdated = async (req, res, next) => {
    new OkResponse({
      message: "get list order success",
      metadata: await orderService.getListOrder(req.body),
    }).send(res);
  };
}

module.exports = new OrderController();
