const {
  CreatedResponse,
  OkResponse,
  SuccessResponse,
} = require("../core/success.response");
const ThumbnailsService = require("../services/thumbnails.service");

class ThumbnailsController {
  addThumbnail = async (req, res, next) => {
    new CreatedResponse({
      message: "add thumbnails success!",
      metadata: await ThumbnailsService.addThumbnail({
        file: req.file,
        body: req.body,
      }),
    }).send(res);
  };
}

module.exports = new ThumbnailsController();
