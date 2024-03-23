const { findById } = require("../services/apiKey.service");
const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(403).json({
        message: "Forbidden Error: Can't find apiKey",
      });
    }

    //check objKey
    const objKey = await findById(key);
    if (!objKey) {
      return res.status(403).json({
        message: "Forbidden Error",
      });
    }
    req.objKey = objKey;
    return next();
  } catch (error) {}
};

const permission = (permission) => {
  return (req, res, next) => {
    if (!req.objKey.permission) {
      return res.status(403).json({
        message: "permissions denied",
      });
    }
    const validPermission = req.objKey.permission == permission;
    if (!validPermission) {
      return res.status(403).json({
        message: "permissions denied",
      });
    }
    return next();
  };
};

module.exports = { apiKey, permission };
