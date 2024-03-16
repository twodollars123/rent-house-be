const client = require("../dbs/init.postgres.lv0");

class AccessRepo {
  getUserByEmail = async (email) => {
    try {
      const query = {
        text: "select * from users u where u.email = $1",
        values: [email],
      };
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.log(error);
    }
  };

  getUserById = async (userId) => {
    try {
      const query = {
        text: "select * from users where user_id = $1",
        values: [userId],
      };
      const result = await client.query(query);
      return result.rows[0];
    } catch (error) {
      console.log(error);
    }
  };

  createNewUser = async (email, name, password) => {
    try {
      const query = {
        text: "INSERT INTO users (email, name, password)  VALUES ( $1, $2, $3) RETURNING user_id",
        values: [email, name, password],
      };
      const result = await client.query(query);
      const newUser = await this.getUserById(result.rows[0].user_id);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new AccessRepo();
