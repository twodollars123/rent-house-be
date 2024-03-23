const client = require("../dbs/init.postgres.lv0");

class ProductsRepo {
  createOne = async (payload) => {
    const {
      caption,
      address,
      geo_point,
      author_id,
      bed,
      wardrobe,
      kitchen,
      closed_toilet,
      electricity_price,
      water_price,
      parking,
    } = payload;

    const query = {
      text: "insert into products (caption,address,geo_point,author_id,bed,wardrobe,kitchen,closed_toilet,electricity_price,water_price,parking) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning id",
      values: [
        caption,
        address,
        geo_point,
        author_id,
        bed,
        wardrobe,
        kitchen,
        closed_toilet,
        electricity_price,
        water_price,
        parking,
      ],
    };

    const createdId = (await client.query(query)).rows[0].id;
    return createdId;
  };

  findOneById = async (id) => {
    const query = {
      text: "select * from products where id = $1",
      values: [id],
    };
    const res = (await client.query(query)).rows;
    return res;
  };
}

module.exports = new ProductsRepo();
