const InventoriesRepo = require("../entity/inventories.repo");
const ProductsRepo = require("../entity/products.repo");
const { BadRequestError, NotFoundError } = require("../core/error.response");
class InventoriesService {
  addInitInven = async (body) => {
    const { prodId, stockQuantity } = body;
    const foundProd = await ProductsRepo.findOneById(prodId);
    if (!foundProd)
      throw new NotFoundError(
        "err: findOneById tai addInitInven service Inventories"
      );
    const newInven = await InventoriesRepo.createOne(prodId, stockQuantity);
    if (!newInven)
      throw new BadRequestError("createOne inven fail in inventoriesService");
    return {
      newInven,
    };
  };

  getInStockQuantity = async (body) => {
    const prodId = body;
    const foundInven = await InventoriesRepo.findOneByProdId(prodId);
    if (!foundInven)
      throw new BadRequestError("get in stock quatity by prodid fail");
    return { foundInven };
  };
}

module.exports = new InventoriesService();
