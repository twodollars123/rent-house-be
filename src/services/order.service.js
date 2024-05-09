const { NotFoundError, BadRequestError } = require("../core/error.response");
const orderRepo = require("../entity/order.repo");
const userRepo = require("../entity/user.repo");
const productRepo = require("../entity/products.repo");
const notificationsService = require("./notifications.service");
const producerDLX = require("../tests/rabbitmq/producerDLX");
const inventoriesRepo = require("../entity/inventories.repo");

class OrderService {
  createNewOrder = async (payload) => {
    const { ownerId, renterId, prodId } = payload;
    const checkedOwnerId = await userRepo.findOne(ownerId);
    if (!checkedOwnerId) throw new NotFoundError("id chu phong khong ton tai");
    const checkedRenterId = await userRepo.findOne(renterId);
    if (!checkedRenterId)
      throw new NotFoundError("id nguoi thue phong khong ton tai");
    const checkedProdId = await productRepo.findOneById(prodId);
    if (!checkedProdId) throw new NotFoundError("khong ton tai prodid");
    const newOrder = await orderRepo.createOne(ownerId, renterId, prodId);
    if (!newOrder) throw new BadRequestError("tao noi order that bai");
    const newNoti = await notificationsService.createNoti({
      noti_typeId: 2,
      noti_senderId: renterId,
    });
    if (!newNoti)
      throw new BadRequestError(
        "create noti fail check createNewOrder in OrderService"
      );
    await producerDLX({ message: { newNoti, receivedId: ownerId } })
      .then((rs) => console.log("rs::", rs))
      .catch(console.error);
    return { newOrder };
  };

  getListOrder = async (payload) => {
    const { prodId } = payload;
    const checkedProdId = await productRepo.findOneById(prodId);
    if (!checkedProdId)
      throw new NotFoundError("khong ton tai prodid loi tai get list order");
    const listorder = await orderRepo.getHistoryByProdId(prodId);
    if (!listorder) throw new BadRequestError("loi get list order");
    return { listorder };
  };

  getHistoryByUserId = async (payload) => {
    const { userId } = payload;
    const checkedOwnerId = await userRepo.findOne(userId);
    if (!checkedOwnerId) throw new NotFoundError("id chu phong khong ton tai");
    const listHistory = await orderRepo.getHistoryByUserId(userId);
    if (!listHistory) throw new BadRequestError("get list history fail");
    return listHistory;
  };

  getListRequest = async (payload) => {
    const { userId } = payload;
    const checkedOwnerId = await userRepo.findOne(userId);
    if (!checkedOwnerId) throw new NotFoundError("id chu phong khong ton tai");
    const listRequest = await orderRepo.getRequestByUserId(userId);
    if (!listRequest) throw new BadRequestError("get list request fail");
    return listRequest;
  };

  updateStatus = async (payload) => {
    const { processId, status } = payload;
    const updatedResult = await orderRepo.updateOne(processId, status);
    if (!updatedResult) throw new BadRequestError("updated status failure");
    const foundProcess = await orderRepo.findOne(updatedResult);
    if (!foundProcess) throw new NotFoundError("khong tao tai process");
    const newNoti = await notificationsService.createNoti({
      noti_typeId: status,
      noti_senderId: foundProcess.owner_id,
    });
    if (!newNoti)
      throw new BadRequestError(
        "create noti fail check createNewOrder in OrderService"
      );
    await producerDLX({
      message: { newNoti, receivedId: foundProcess.renter_id },
    })
      .then((rs) => console.log("rs::", rs))
      .catch(console.error);

    if (status == 4) {
      const prod_inven = await inventoriesRepo.findOneByProdId(
        foundProcess.prod_id
      );
      if (!prod_inven) throw new NotFoundError("khong ton tai prod-inven");
      if (prod_inven.in_stock_quantity == 0)
        throw new BadRequestError("Đã hết phòng");
      const incInven = await inventoriesRepo.updateByProdId(
        foundProcess.prod_id,
        prod_inven.in_stock_quantity - 1
      );
      if (!incInven) throw new BadRequestError("update quantity fail");
    }
    return { updatedResult };
  };
}

module.exports = new OrderService();
