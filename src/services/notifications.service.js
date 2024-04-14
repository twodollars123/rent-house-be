const notificationRepo = require("../entity/notifications.repo");
const notiReceivedRepo = require("../entity/noti_received.repo");

const { BadRequestError } = require("../core/error.response");

class NotificationsService {
  createNoti = async (payload) => {
    const { noti_typeId, noti_senderId } = payload;
    const noti_receivedId = [3];
    const newNotiId = await notificationRepo.createOne({
      noti_typeId,
      noti_senderId,
    });
    if (!newNotiId) throw new BadRequestError("created notification falurely");
    if (!(noti_receivedId && noti_receivedId.length > 0))
      throw new BadRequestError("noti_receive is not exist");
    noti_receivedId.map(async (id) => {
      const newNotiReceiveId = await notiReceivedRepo.createOne({
        received_id: id,
        noti_id: newNotiId,
      });
      if (!newNotiReceiveId)
        throw new BadRequestError("created noti_received falurely");
    });
    return {
      messageSucces: "created a new notification successfully",
    };
  };
}

module.exports = new NotificationsService();
