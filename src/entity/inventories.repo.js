const { values } = require("lodash");
const client = require("../dbs/init.postgres.lv0");

class InventoriesRepo {
  createOne = async (prod_id, in_stock_quantity) => {
    const query = {
      text: "insert into inventories (prod_id, in_stock_quantity) values ($1, $2) returning inven_id",
      values: [prod_id, in_stock_quantity],
    };
    const createdId = (await client.query(query)).rows[0].inven_id;
    return createdId;
  };

  updateByProdId = async (prodId, valueChange) => {
    const query = {
      text: "update inventories set in_stock_quantity = $1 where prod_id = $2",
      values: [valueChange, prodId],
    };
    const res = await client.query(query);
    console.log("res:::", res);
    return res;
  };

  findOneByProdId = async (prodId) => {
    const query = {
      text: "select * from inventories where prod_id = $1",
      values: [prodId],
    };

    const found = (await client.query(query)).rows[0];
    return found;
  };
}

module.exports = new InventoriesRepo();
