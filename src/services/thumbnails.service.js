const {
  BadRequestError,
  AuthFailureError,
  ForbiddenError,
  NotFoundError,
} = require("../core/error.response");
const ThumbnailsRepo = require("../entity/thumbnails.repo");

class ThumbnailsService {
  addThumbnail = async (payload) => {
    console.log("thumbnail", payload);
    const { alt, prod_id } = payload.body;
    const file = payload.file;
    const newThumb_id = await ThumbnailsRepo.addThumb(
      file.path,
      file.filename,
      alt,
      prod_id
    );
    if (!newThumb_id) throw new BadRequestError("add new thumbnail failure!");
    const newThumb = await ThumbnailsRepo.findOne(newThumb_id);
    if (!newThumb) throw new NotFoundError("not found new thumbnail!");
    const thumbProd = await ThumbnailsRepo.findByProdId(prod_id);
    return {
      code: 201,
      metadata: {
        newThumb,
      },
    };
  };
}

module.exports = new ThumbnailsService();
