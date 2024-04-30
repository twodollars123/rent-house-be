const { NotFoundError, BadRequestError } = require("../core/error.response");
const MethodPaymentsRepo = require("../entity/methodPayments.repo");
const ProductsRepo = require("../entity/products.repo");

class MethodPaymentsService {
  addNewMappingMpProd = async (body) => {
    const { prodId, mpId } = body;
    const foundProd = await ProductsRepo.findOneById(prodId);
    if (!foundProd)
      throw new NotFoundError(
        "add new mappping method-prod fail, check find prod by id"
      );
    const foundMp = await MethodPaymentsRepo.checkExistById(mpId);
    if (!foundMp)
      throw new NotFoundError("add new mappping method-prod fail, check mpid");
    const newMapping = await MethodPaymentsRepo.createOne(prodId, mpId);
    if (!newMapping)
      throw new BadRequestError("check createOne in methodpaymentsRepo");
    return {
      newMapping,
    };
  };
}

module.exports = new MethodPaymentsService();
