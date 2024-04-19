const Router = require("express").Router();
const UsersController = require("../../controllers/users.controller");

const { asyncHandler } = require("../../helpers/asyncHandler.helper");

Router.get("/users/:id", asyncHandler(UsersController.findInfoById));

module.exports = Router;
