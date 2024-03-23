const { OkResponse, CreatedResponse } = require("../core/success.response");
const ProductsService = require("../services/products.service");

class ProductsController {
  addNewProd = async (req, res, next) => {
    new CreatedResponse({
      message: "created successfully",
      metadata: await ProductsService.addNewProd(req.body),
    }).send(res);
  };
}

module.exports = new ProductsController();
