const {
  CreatedResponse,
  OkResponse,
  SuccessResponse,
} = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
  signup = async (req, res, next) => {
    new CreatedResponse({
      message: "Register success!",
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  };
  login = async (req, res, next) => {
    new SuccessResponse({
      message: "Login successfully!",
      metadata: await AccessService.login(req.body),
    }).send(res);
  };
}

module.exports = new AccessController();
