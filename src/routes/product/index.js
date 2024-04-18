const Router = require("express").Router();
const productsController = require("../../controllers/products.controller");
const ThumbnailsController = require("../../controllers/thumbnails.controller");
// const upload = require("../../utils/uploadFile");

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../../configs/cloudirary.config");

const { asyncHandler } = require("../../helpers/asyncHandler.helper");
const multer = require("multer");

Router.post("/prod/add_prod", asyncHandler(productsController.addNewProd));
Router.get("/prod/all", asyncHandler(productsController.getAll));
Router.get("/prod/preview/:id", asyncHandler(productsController.preview));
Router.get("/prod", asyncHandler(productsController.getLimit));
Router.get("/getThumbs/:id", asyncHandler(ThumbnailsController.getThumbs));

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "rent-house",
  },
});

const upload = multer({ storage: storage });

Router.use(
  "/prod/add_thumb",
  upload.single("url"),
  asyncHandler(ThumbnailsController.addThumbnail)
);

module.exports = Router;
