const client = require("../dbs/init.postgres.lv0");

class OrderRepo {
  createOne = async (ownerId, renterId, prodId) => {
    const query = {
      text: "insert into processing (owner_id, renter_id, prod_id, status) values ($1, $2, $3, 1) returning process_id",
      values: [ownerId, renterId, prodId],
    };

    const createdId = (await client.query(query)).rows[0].process_id;
    return createdId;
  };

  getHistoryByProdId = async (prodId) => {
    const query = {
      text: "select * from processing p inner join process_status ps on p.status = ps.process_status_id where p.prod_id = $1 and p.status in (3, 4)",
      values: [prodId],
    };

    const listHistory = (await client.query(query)).rows;
    return listHistory;
  };

  getHistoryByUserId = async (userID) => {
    const query = {
      text: "select * from processing p inner join process_status ps on p.status = ps.process_status_id where p.owner_id = $1 and p.status in (3, 4)",
      values: [userID],
    };

    const listHistory = (await client.query(query)).rows;
    return listHistory;
  };

  getRequestByUserId = async (userId) => {
    const query = {
      text: "select * from processing p inner join process_status ps on p.status = ps.process_status_id where p.owner_id = $1 and p.status = 1",
      values: [userId],
    };
    const listRequest = (await client.query(query)).rows;
    return listRequest;
  };

  updateOne = async (processId, status) => {
    const query = {
      text: "update processing set status = $1 where process_id = $2 returning process_id",
      values: [status, processId],
    };
    const updated = (await client.query(query)).rows[0].process_id;
    return updated;
  };

  findOne = async (processId) => {
    const query = {
      text: "select * from processing p inner join process_status ps on p.status = ps.process_status_id where p.process_id = $1",
      values: [processId],
    };

    const found = (await client.query(query)).rows[0];
    return found;
  };
}

module.exports = new OrderRepo();
