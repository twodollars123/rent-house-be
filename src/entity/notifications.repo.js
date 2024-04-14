const client = require("../dbs/init.postgres.lv0");

class NotificationsRepo {
  createOne = async (payload) => {
    const { noti_typeId, noti_senderId, noti_options = {} } = payload;
    const query = {
      text: "insert into notifications (noti_typeId, noti_senderId, noti_options) values ($1, $2, $3) returning noti_id",
      values: [noti_typeId, noti_senderId, noti_options],
    };
    const createdId = (await client.query(query)).rows[0].noti_id;
    return createdId;
  };
}

module.exports = new NotificationsRepo();
