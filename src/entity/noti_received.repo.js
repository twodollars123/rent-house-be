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

  getAllByUserId = async (received_id) => {
    const query = {
      text: "select * from notifications n inner join noti_types nt on n.noti_typeid = nt.noti_typeid inner join noti_received nr on n.noti_id = nr.noti_id inner join users u on n.noti_senderid = u.user_id  where nr.received_id in (-1, $1) and nr.status = 0 order by nr.createat asc",
      values: [received_id],
    };
    const listNoti = (await client.query(query)).rows;
    return listNoti;
  };

  updateStatus = async (noti_receivedId) => {
    const query = {
      text: " update noti_received set status = 1 where noti_receivedId = $1 returning noti_receivedId",
      values: [noti_receivedId],
    };

    const updatedId = (await client.query(query)).rows[0].noti_receivedid;
    console.log("updateStatus noti::", updatedId);
    return updatedId;
  };
}

module.exports = new NotiReceivedRepo();
