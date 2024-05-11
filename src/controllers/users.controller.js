const UsersService = require("../services/users.service");
const { SuccessResponse } = require("../core/success.response");

class UsersController {
  findInfoById = async (req, res, next) => {
    new SuccessResponse({
      message: "get info user",
      metadata: await UsersService.getInfoById(req.params.id),
    }).send(res);
  };

  getListAccount = async (req, res, next) => {
    new SuccessResponse({
      message: "get list account success",
      metadata: await UsersService.getListAccount(),
    }).send(res);
  };
}

module.exports = new UsersController();
