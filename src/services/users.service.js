const UserRepo = require("../entity/user.repo");
const { NotFoundError, BadRequestError } = require("../core/error.response");

class UsersService {
  getInfoById = async (id) => {
    const user = await UserRepo.findOne(id);
    if (!user) throw new NotFoundError("khong tim thay user");
    return user;
  };
}

module.exports = new UsersService();
