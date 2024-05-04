const notificationRepo = require("../entity/notifications.repo");
const notiReceivedRepo = require("../entity/noti_received.repo");

const { BadRequestError, NotFoundError } = require("../core/error.response");
const { user } = require("../configs/postgre.config");
const userRepo = require("../entity/user.repo");

class NotificationsService {
  createNoti = async (payload) => {
    const { noti_typeId, noti_senderId } = payload;
    // const noti_receivedId = [3];
    const newNotiId = await notificationRepo.createOne({
      noti_typeId,
      noti_senderId,
    });
    if (!newNotiId) throw new BadRequestError("created notification falurely");
    // if (!(noti_receivedId && noti_receivedId.length > 0))
    //   throw new BadRequestError("noti_receive is not exist");
    // noti_receivedId.map(async (id) => {
    //   const newNotiReceiveId = await notiReceivedRepo.createOne({
    //     received_id: id,
    //     noti_id: newNotiId,
    //   });
    //   if (!newNotiReceiveId)
    //     throw new BadRequestError("created noti_received falurely");
    // });
    return { newNotiId };
  };

  getAllNotiByUserId = async (payload) => {
    const { userId } = payload;
    const checkUserId = await userRepo.findOne(userId);
    if (!checkUserId)
      throw new NotFoundError("khong tim thay user tai luong get all noti");
    const listNoti = await notiReceivedRepo.getAllByUserId(userId);
    if (!listNoti) throw new NotFoundError("khong co noti nao");
    return { listNoti };
  };
}

module.exports = new NotificationsService();
