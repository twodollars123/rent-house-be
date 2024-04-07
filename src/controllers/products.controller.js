const { OkResponse, CreatedResponse } = require("../core/success.response");
const ProductsService = require("../services/products.service");

class ProductsController {
  addNewProd = async (req, res, next) => {
    new CreatedResponse({
      message: "created successfully",
      metadata: await ProductsService.addNewProd(req.body),
    }).send(res);
  };

  preview = async (req, res, next) => {
    new OkResponse({
      message: "ok",
      metadata: await ProductsService.preview(req.params.id),
    }).send(res);
  };

  getAll = async (req, res, next) => {
    new OkResponse({
      message: "get all prod ok",
      metadata: await ProductsService.getAll(),
    }).send(res);
  };

  getLimit = async (req, res, next) => {
    new OkResponse({
      message: "get prod ok",
      metadata: await ProductsService.getLimit(req.query),
    }).send(res);
  };
}

module.exports = new ProductsController();
