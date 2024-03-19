const apiKeyRepo = require("../entity/apiKey.repo");
const findById = async (key) => {
  const objKey = await apiKeyRepo.findKey(key);
  return objKey;
};

module.exports = { findById };
