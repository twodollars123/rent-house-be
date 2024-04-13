const commentsRepo = require("../entity/comments.repo");
const { NotFoundError, BadRequestError } = require("../core/error.response");
const _ = require("lodash");

class CommentsService {
  createOne = async (payload) => {
    const { cmt_parentId, ...others } = payload;
    let rightvalue;
    if (cmt_parentId != null) {
      const parentComment = await commentsRepo.findOneById(cmt_parentId);
      if (!parentComment) throw new NotFoundError("not found parent comment");
      rightvalue = parentComment.cmt_right;
      //update cmt that it's cmt_right >= rightvalue
      const updatedCmtRight = await commentsRepo.updateCmtRight(rightvalue, 2);
      //update cmt that it's cmt_left > rightvalue
      const updatedCmtLeft = await commentsRepo.updateCmtLeft(rightvalue, 2);
    } else {
      rightvalue = await commentsRepo.findMaxRight();
      if (!rightvalue) {
        rightvalue = 1;
      } else {
        rightvalue = rightvalue + 1;
      }
    }

    const cmt_right = rightvalue + 1;
    const cmt_left = rightvalue;
    const params = {
      ...others,
      cmt_parentId,
      cmt_left,
      cmt_right,
    };
    const newCommentId = await commentsRepo.createOne(params);
    if (!newCommentId) throw new BadRequestError("created new comment failure");
    return {
      newCommentId,
    };
  };

  getRootComments = async (prodId) => {
    const listComments = await commentsRepo.findAllRootCmt(prodId);
    if (!listComments) throw new NotFoundError("not found list root comt");
    return {
      listComments,
    };
  };

  getCmtReply = async (id) => {
    const listReplyCmts = await commentsRepo.findAllReplyCmtById(id);
    if (!listReplyCmts) throw new NotFoundError("not found list reply cmt");
    return {
      listReplyCmts,
    };
  };

  deleteComments = async (payload) => {
    const { cmt_prodId, cmt_id } = payload;
    // check prodId co cmt khong
    const listCmt = await commentsRepo.findAllByProdId(cmt_prodId);
    if (!listCmt) throw NotFoundError("post does not have any comments yet");
    //lay left right
    const cmt = await commentsRepo.findOneById(cmt_id);
    if (!cmt) throw new NotFoundError("cmt is not exist");
    //tinh width
    const { cmt_left, cmt_right } = cmt;
    const width = cmt_right - cmt_left + 1;
    const deleted = await commentsRepo.delete(cmt_left, cmt_right);
    if (!deleted) throw new NotFoundError("deleted failurely");
    //update cmt_left > left  - width
    await commentsRepo.updateCmtLeft(cmt_left, -width);
    //update cmt_right > right -width
    await commentsRepo.updateCmtRight(cmt_right, -width);
    return {
      message: "xoa thanh cong",
    };
  };
}

module.exports = new CommentsService();
