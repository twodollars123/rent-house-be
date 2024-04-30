const client = require("../dbs/init.postgres.lv0");

class MethodPayments {
  createOne = async (prodId, mpId) => {
    const query = {
      text: "insert into method_payments_prod (prod_id, mp_id) values ($1, $2) returning mpp_id",
      values: [prodId, mpId],
    };
    const newMpId = (await client.query(query)).rows[0].mpp_id;
    return newMpId;
  };

  checkExistById = async (mpId) => {
    const query = {
      text: "select * from method_payments where mp_id = $1",
      values: [mpId],
    };
    const checked = (await client.query(query)).rows[0];
    return checked;
  };
}

module.exports = new MethodPayments();
