const Router = require("express").Router();
const ThumbnailsController = require("../../controllers/thumbnails.controller");
const upload = require("../../utils/uploadFile");

// const multer = require("multer");

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });

// // var upload = multer({ storage: storage });
// // const upload = multer();
// const upload = multer({ dest: "uploads/" });

Router.use(
  "/prod/:prod_id/add_thumb",
  upload.single("url"),
  ThumbnailsController.addThumbnail
);

module.exports = Router;
