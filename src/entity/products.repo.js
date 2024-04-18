const { values } = require("lodash");
const client = require("../dbs/init.postgres.lv0");

class ProductsRepo {
  createOne = async (payload) => {
    console.log(payload);
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
      methodPayment,
      maximumMember,
      room_price,
      cleaningFee,
    } = payload;

    const query = {
      text: "insert into products (caption,address,geo_point,author_id,bed,wardrobe,kitchen,closed_toilet,electricity_price,water_price,parking, method_payment, max_member, romm_price,cleaning_fee) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) returning id",
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
        methodPayment.value,
        maximumMember,
        room_price,
        cleaningFee,
      ],
    };

    const createdId = (await client.query(query)).rows[0].id;
    return createdId;
  };

  createCommonFields = async (payload) => {
    const { caption, address, geo_point, author_id } = payload;

    const query = {
      text: "insert into products (caption,address,geo_point,author_id) values ($1, $2, $3, $4) returning id",
      values: [caption, address, geo_point, author_id],
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
    console.log("res", res);
    return res;
  };

  findOneAllProperty = async (id) => {
    const query = {
      text: "select p.id, p.caption, p.address, u.user_id , u.name from products p inner join thumbnails t on p.id = t.prod_id inner join users u on p.author_id = u.user_id where p.id =$1",
      values: [id],
    };
    const res = (await client.query(query)).rows;
    console.log("res prod", res);
    return res;
  };

  updateById = async (id, payload) => {
    const query = {
      text: "update products set bed = $1,wardrobe = $2,kitchen = $3,closed_toilet =$4,electricity_price = $5,water_price = $6,parking = $7, where id = $8 returning id",
      values: [
        payload.bed,
        payload.wardrobe,
        payload.kitchen,
        payload.closed_toilet,
        payload.electricity_price,
        payload.water_price,
        payload.parking,
        id,
      ],
    };
    const updatedId = await client.query(query).rows[0].id;
    return updatedId;
  };

  findAll = async () => {
    const query = {
      text: "select * from products",
      values: [],
    };
    const res = await client.query(query);
    return res.rows;
  };

  findLimit = async (page, itemsPerPage) => {
    const offset = (page - 1) * itemsPerPage || 0;
    const limit = itemsPerPage || 10;
    const query = {
      text: "select * from products order by id limit $1 offset $2",
      values: [limit, offset],
    };
    const res = await client.query(query);
    return res.rows;
  };

  getTotalAmount = async () => {
    const query = {
      text: "select count(id) as total from products p",
      values: [],
    };
    const res = await client.query(query);
    return res.rows[0].total;
  };
}

module.exports = new ProductsRepo();
