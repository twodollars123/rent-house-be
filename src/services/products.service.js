const { BadRequestError, NotFoundError } = require("../core/error.response");
const ProductsRepo = require("../entity/products.repo");
const notificationsService = require("./notifications.service");
const producerDLX = require("../tests/rabbitmq/producerDLX");

class ProductsService {
  addNewProd = async (payload) => {
    const newProdId = await ProductsRepo.createOne(payload);
    if (!newProdId) throw new NotFoundError("created failure!");
    const newProd = await ProductsRepo.findOneById(newProdId);
    if (!newProd) throw new NotFoundError("not found!");
    const newNoti = await notificationsService.createNoti({
      noti_typeId: 1,
      noti_senderId: payload.author_id,
    });
    if (!newNoti)
      throw new BadRequestError(
        "create noti fail check createNoti in productservice"
      );
    await producerDLX({ message: { newNoti } })
      .then((rs) => console.log("rs::", rs))
      .catch(console.error);
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
    console.log("id", id);
    const prod = await ProductsRepo.findOneById(id);
    if (!prod) throw new NotFoundError("not found");
    return {
      code: 200,
      metadata: {
        prod,
      },
    };
  };

  getAll = async () => {
    const allProd = await ProductsRepo.findAll();
    if (!allProd) {
      // throw new NotFoundError("khong co prod nao!");
      return {
        code: 500,
      };
    }
    return {
      code: 200,
      metadata: {
        allProd,
      },
    };
  };

  getLimit = async (params) => {
    const { page, itemsPerPage } = params;
    const data = await ProductsRepo.findLimit(page, itemsPerPage);
    const totalItems = await ProductsRepo.getTotalAmount();
    return {
      code: 200,
      metadata: {
        data,
        totalItems,
      },
    };
  };
}

module.exports = new ProductsService();
