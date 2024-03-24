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

  addOptions = async (id, payload) => {
    const updatedId = await ProductsRepo.updateById(id, payload);
    if (!updatedId) throw new BadRequestError("update prod failure!");
    return {
      code: 200,
      metadata: {
        updatedId,
      },
    };
  };

  preview = async (id) => {
    const prod = await ProductsRepo.findOneAllProperty(id);
    if (!prod) throw new NotFoundError("not found");
    return {
      code: 200,
      metadata: {
        prod,
      },
    };
  };
}

module.exports = new ProductsService();
