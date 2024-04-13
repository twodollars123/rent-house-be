const {
  SuccessResponse,
  CreatedResponse,
} = require("../core/success.response");
const commentsService = require("../services/comments.service");

class CommentsConntroller {
  createComment = async (req, res, next) => {
    new CreatedResponse({
      message: "created comments is successfull",
      metadata: await commentsService.createOne(req.body),
    }).send(res);
  };

  getRootComments = async (req, res, next) => {
    new SuccessResponse({
      message: "get root comments are ok",
      metadata: await commentsService.getRootComments(req.params.prodId),
    }).send(res);
  };

  getCmtReply = async (req, res, next) => {
    new SuccessResponse({
      message: "get cmts reply are ok",
      metadata: await commentsService.getCmtReply(req.params.cmtId),
    }).send(res);
  };

  deleteComments = async (req, res, next) => {
    new SuccessResponse({
      message: "deleted successfully",
      metadata: await commentsService.deleteComments(req.body),
    }).send(res);
  };
}

module.exports = new CommentsConntroller();
