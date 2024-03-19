const client = require("../dbs/init.postgres.lv0");

class ApiKeyRepo {
  findKey = async (key) => {
    //trycatch -> query -> client.query -> return
    try {
      const query = {
        text: "select * from apiKey where key = $1",
        values: [key],
      };
      const res = await client.query(query);
      return res.rows[0];
    } catch (error) {
      console.log("err find key::", error);
    }
  };
}

module.exports = new ApiKeyRepo();
