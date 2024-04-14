const client = require("../dbs/init.postgres.lv0");

class NotiReceivedRepo {
  createOne = async (payload) => {
    const { noti_id, received_id } = payload;
    const query = {
      text: "insert into noti_received (noti_id, received_id) values ($1, $2) returning noti_receivedId",
      values: [noti_id, received_id],
    };
    const createdId = (await client.query(query)).rows[0].noti_receivedid;
    return createdId;
  };
}

module.exports = new NotiReceivedRepo();
