const client = require("../dbs/init.postgres.lv0");

class UserRepo {
  findOne = async (id) => {
    const query = {
      text: "select * from users where user_id = $1",
      values: [id],
    };
    const user = (await client.query(query)).rows[0];
    return user;
  };
}

module.exports = new UserRepo();
