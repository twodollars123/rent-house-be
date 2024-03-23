const { BadRequestError, NotFoundError } = require("../core/error.response");
const ProductsRepo = require("../entity/products.repo");

class ProductsService {
  addNewProd = async (payload) => {
    const newProdId = await ProductsRepo.createOne(payload);
    if (!newProdId) throw new NotFoundError("created failure!");
    const newProd = await ProductsRepo.findOneById(newProdId);
    if (!newProd) throw new NotFoundError("not found!");
    return {
      code: 201,
      metadata: {
        newProd,
      },
    };
  };
}

module.exports = new ProductsService();
