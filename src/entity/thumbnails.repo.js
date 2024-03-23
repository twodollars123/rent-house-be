const client = require("../dbs/init.postgres.lv0");

class ThumbnailsRepo {
  addThumb = async (path, filename, alt, prod_id) => {
    try {
      const query = {
        text: "insert into thumbnails (url, file_name, alt, prod_id) values ($1, $2, $3, $4) RETURNING id",
        values: [path, filename, alt, prod_id],
      };
      const res_id = await client.query(query);
      return res_id.rows[0].id;
    } catch (error) {
      console.log("addTHumbErr:::", error);
    }
  };

  findOne = async (id) => {
    try {
      const query = {
        text: "select * from thumbnails where id = $1",
        values: [id],
      };
      const res = await client.query(query);
      return res.rows;
    } catch (error) {
      console.log("addTHumbErr:::", error);
    }
  };

  findByProdId = async (prod_id) => {
    try {
      const query = {
        text: "select * from thumbnails where prod_id = $1",
        values: [prod_id],
      };
      const res = await client.query(query);
      return res.rows;
    } catch (error) {
      console.log("addTHumbErr:::", error);
    }
  };
}

module.exports = new ThumbnailsRepo();
