const Router = require("express").Router();
const notiController = require("../../controllers/notification.controller");

const { asyncHandler } = require("../../helpers/asyncHandler.helper");

Router.post("/noti/getnoti", asyncHandler(notiController.getAllNoti));

module.exports = Router;
