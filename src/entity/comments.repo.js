const client = require("../dbs/init.postgres.lv0");

class CommentsRepo {
  createOne = async (input) => {
    const {
      cmt_parentId,
      cmt_content,
      cmt_prodId,
      cmt_userId,
      cmt_left,
      cmt_right,
    } = input;
    const query = {
      text: "insert into comments (cmt_parentId, cmt_content, cmt_prodid, cmt_userId, cmt_left, cmt_right) values ($1, $2, $3, $4, $5, $6) returning cmt_id",
      values: [
        cmt_parentId,
        cmt_content,
        cmt_prodId,
        cmt_userId,
        cmt_left,
        cmt_right,
      ],
    };
    const newCmt = (await client.query(query)).rows[0].cmt_id;
    return newCmt;
  };

  findOneById = async (id) => {
    const query = {
      text: "select * from comments where cmt_id = $1",
      values: [id],
    };
    const cmt = (await client.query(query)).rows[0];
    return cmt;
  };

  findMaxRight = async (prod_id) => {
    const query = {
      text: "select cmt_right from comments where cmt_right is not null and cmt_prodid = $1 order by cmt_right desc limit 1",
      values: [prod_id],
    };
    const cmt = (await client.query(query)).rows[0];
    console.log("return ::", cmt);
    return cmt;
  };

  findAllByProdId = async (prodId) => {
    const query = {
      text: "select * from comments where cmt_prodId = $1",
      values: [prodId],
    };
    const cmt = (await client.query(query)).rows;
    return cmt;
  };

  findAllRootCmt = async (prodId) => {
    const query = {
      text: "select * from comments c join users u on c.cmt_userid = u.user_id where cmt_parentId is null and cmt_prodId = $1",
      values: [prodId],
    };
    const cmt = (await client.query(query)).rows;
    return cmt;
  };

  findAllReplyCmtById = async (id) => {
    const query = {
      text: "select * from comments where cmt_parentId = $1",
      values: [id],
    };
    const cmt = (await client.query(query)).rows;
    return cmt;
  };

  findReplyCmt = async (left, right, prodId) => {
    const query = {
      text: "SELECT * FROM comments c join users u on c.cmt_userid = u.user_id  WHERE cmt_left > $1 AND cmt_right < $2 AND cmt_prodid = $3",
      values: [left, right, prodId],
    };

    const cmt = (await client.query(query)).rows;
    console.log("cmt ;;", cmt);
    return cmt;
  };

  updateCmtRight = async (maxRight, incValue, prod_id) => {
    const query = {
      text: "update comments set cmt_right = cmt_right + $1 where cmt_right >= $2 and cmt_prodId = $3",
      values: [incValue, maxRight, prod_id],
    };
    const cmt = await client.query(query);
    return cmt;
  };

  updateCmtLeft = async (maxLeft, incValue, cmt_prodId) => {
    const query = {
      text: "update comments set cmt_left = cmt_left + $1 where cmt_left >= $2 and cmt_prodId = $3",
      values: [incValue, maxLeft, cmt_prodId],
    };
    const cmt = await client.query(query);
    return cmt;
  };

  delete = async (left, right) => {
    const query = {
      text: "delete from comments where cmt_left between $1 and $2",
      values: [left, right],
    };
    const cmt = await client.query(query);
    console.log("delete::", cmt);
    return cmt;
  };
}

module.exports = new CommentsRepo();
