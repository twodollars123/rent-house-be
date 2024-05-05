const InventoriesService = require("../services/inventories.service");

const { OkResponse, CreatedResponse } = require("../core/success.response");

class InventoriesControllers {
  addInven = async (req, res, next) => {
    new CreatedResponse({
      message: "add inven successfully",
      metadata: await InventoriesService.addInitInven(req.body),
    }).send(res);
  };

  getInStock = async (req, res, next) => {
    new OkResponse({
      message: "get inventory success",
      metadata: await InventoriesService.getInStockQuantity(req.params.prodid),
    }).send(res);
  };
}

module.exports = new InventoriesControllers();
