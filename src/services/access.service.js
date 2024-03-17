const accessRepo = require("../entity/access.repo");
const {
  BadRequestError,
  AuthFailureError,
  ForbiddenError,
  NotFoundError,
} = require("../core/error.response");
const { createTokenPair } = require("../auth/authUtils");
const { getInforData } = require("../utils/index");

const bcrypt = require("bcrypt");
const crypto = require("crypto");
const _ = require("lodash");
class AccessService {
  static signUp = async (body) => {
    const { email, name, password } = body;
    try {
      //check email exist???
      const existEmail = await accessRepo.getUserByEmail(email);
      if (!_.isEmpty(existEmail)) {
        throw new BadRequestError("Error:: Email already registered!");
      }
      //hash password
      const passwordHash = await bcrypt.hash(password, 10);
      console.log("passHash::::", passwordHash);
      //create new user
      const newUser = await accessRepo.createNewUser(email, name, passwordHash);
      console.log("new user:::", newUser);
      if (newUser) {
        //generate privateKey, publicKey
        const publicKey = crypto.randomBytes(64).toString("hex");
        const privateKey = crypto.randomBytes(64).toString("hex");
        //save key store => khong hieu muc dich nen khong lam
        //generate token
        const tokenPair = await createTokenPair(
          { userId: newUser.user_id, email },
          publicKey,
          privateKey
        );
        if (_.isEmpty(tokenPair))
          throw new AuthFailureError("generate token pair failure!");

        return {
          code: 201,
          metadata: {
            shop: getInforData({
              fileds: ["user_id", "name", "email"],
              object: newUser,
            }),
            tokenPair,
          },
        };
      }

      return {
        code: 201,
        metadata: null,
      };
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: error.status,
      };
    }
  };
}

module.exports = AccessService;
