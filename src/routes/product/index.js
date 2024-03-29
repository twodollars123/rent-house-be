const Router = require("express").Router();
const productsController = require("../../controllers/products.controller");
const ThumbnailsController = require("../../controllers/thumbnails.controller");
const upload = require("../../utils/uploadFile");

Router.post("/prod/add_prod", productsController.addNewProd);
Router.get("/prod/:id", productsController.preview);

Router.use(
  "/prod/:prod_id/add_thumb",
  upload.single("url"),
  ThumbnailsController.addThumbnail
);

module.exports = Router;
