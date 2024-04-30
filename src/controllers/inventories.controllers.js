const InventoriesService = require("../services/inventories.service");

const { OkResponse, CreatedResponse } = require("../core/success.response");

class InventoriesControllers {
  addInven = async (req, res, next) => {
    new CreatedResponse({
      message: "add inven successfully",
      metadata: await InventoriesService.addInitInven(req.body),
    }).send(res);
  };
}

module.exports = new InventoriesControllers();
