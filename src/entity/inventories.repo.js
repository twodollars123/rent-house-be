const client = require("../dbs/init.postgres.lv0");

class InventoriesRepo {
  createOne = async (params, body) => {
    const prod_id = params;
    const { in_stock_quantity } = body;
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
    return res;
  };
}

module.exports = new InventoriesRepo();
