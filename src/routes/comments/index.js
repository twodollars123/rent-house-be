const express = require("express");
const router = express.Router();

const commentsController = require("../../controllers/comments.controller");
const { asyncHandler } = require("../../helpers/asyncHandler.helper");

router.post("/comments/create", asyncHandler(commentsController.createComment));
router.get(
  "/comments/getRootCmt/:prodId",
  asyncHandler(commentsController.getRootComments)
);
router.get(
  "/comments/getReplyCmt/:cmtId",
  asyncHandler(commentsController.getCmtReply)
);
router.delete(
  "/comments/delete",
  asyncHandler(commentsController.deleteComments)
);

module.exports = router;
