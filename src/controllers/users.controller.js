const UsersService = require("../services/users.service");
const { SuccessResponse } = require("../core/success.response");

class UsersController {
  findInfoById = async (req, res, next) => {
    new SuccessResponse({
      message: "get info user",
      metadata: await UsersService.getInfoById(req.params.id),
    }).send(res);
  };
}

module.exports = new UsersController();
