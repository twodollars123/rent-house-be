const InventoriesControllers = require("../../controllers/inventories.controllers");
const { asyncHandler } = require("../../helpers/asyncHandler.helper");

const Router = require("express").Router();

Router.post("/inven/add", asyncHandler(InventoriesControllers.addInven));

module.exports = Router;
