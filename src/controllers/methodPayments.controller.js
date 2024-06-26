const { CreatedResponse, OkResponse } = require("../core/success.response");
const methodPaymentsService = require("../services/methodPayments.service");

class MethodPaymentsController {
  addMapping = async (req, res, next) => {
    new CreatedResponse({
      message: "created mapping method payments vs prod successfully",
      metadata: await methodPaymentsService.addNewMappingMpProd(req.body),
    }).send(res);
  };
  getInfoPaymentMethod = async (req, res, next) => {
    new OkResponse({
      message: "get infomation payment method success",
      metadata: await methodPaymentsService.getInfoMethodPayment(
        req.params.prodid
      ),
    }).send(res);
  };
}

module.exports = new MethodPaymentsController();
