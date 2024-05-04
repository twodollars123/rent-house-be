const { OkResponse } = require("../core/success.response");
const notiService = require("../services/notifications.service");

class NotificationsController {
  getAllNoti = async (req, res, next) => {
    new OkResponse({
      message: "get all notidication for user success",
      metadata: await notiService.getAllNotiByUserId(req.body),
    }).send(res);
  };
}

module.exports = new NotificationsController();
