const express = require("express");
const router = express.Router();

const commentsController = require("../../controllers/comments.controller");

router.post("/comments/create", commentsController.createComment);
router.get("/comments/getRootCmt/:prodId", commentsController.getRootComments);
router.get("/comments/getReplyCmt/:cmtId", commentsController.getCmtReply);
router.delete("/comments/delete", commentsController.deleteComments);

module.exports = router;
