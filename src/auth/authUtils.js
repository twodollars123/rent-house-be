const JWT = require("jsonwebtoken");
const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    //generate accessToken
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: "2 days",
    });

    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: "7 days",
    });

    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log(`error verify accessToken:: `, err);
      } else {
        console.log(`decode verify accessToken::`, decode);
      }
    });
    JWT.verify(refreshToken, privateKey, (err, decode) => {
      if (err) {
        console.log(`error verify refreshToken:: `, err);
      } else {
        console.log(`decode verify refreshToken::`, decode);
      }
    });

    return { accessToken, refreshToken };
  } catch (error) {}
};

module.exports = { createTokenPair };
