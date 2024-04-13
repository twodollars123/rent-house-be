const Router = require("express").Router();
const productsController = require("../../controllers/products.controller");
const ThumbnailsController = require("../../controllers/thumbnails.controller");
const upload = require("../../utils/uploadFile");

const { asyncHandler } = require("../../helpers/asyncHandler.helper");

Router.post("/prod/add_prod", asyncHandler(productsController.addNewProd));
Router.get("/prod/all", asyncHandler(productsController.getAll));
Router.get("/prod/preview/:id", asyncHandler(productsController.preview));
Router.get("/prod", asyncHandler(productsController.getLimit));

Router.use(
  "/prod/add_thumb",
  upload.single("url"),
  asyncHandler(ThumbnailsController.addThumbnail)
);

module.exports = Router;
