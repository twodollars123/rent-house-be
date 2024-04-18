const {
  BadRequestError,
  AuthFailureError,
  ForbiddenError,
  NotFoundError,
} = require("../core/error.response");
const ThumbnailsRepo = require("../entity/thumbnails.repo");
const ProductsRepo = require("../entity/products.repo");

const cloudinary = require("../configs/cloudirary.config");

class ThumbnailsService {
  addThumbnail = async (payload) => {
    console.log("thumbnail", payload);
    const { alt, prod_id } = payload.body;
    const file = payload.file;

    // const result = await cloudinary.uploader.upload(file);
    // console.log("cloudinary::", result);
    const newThumb_id = await ThumbnailsRepo.addThumb(
      file.path,
      file.filename,
      alt,
      prod_id
    );
    if (!newThumb_id) throw new BadRequestError("add new thumbnail failure!");
    return {
      newThumb_id,
    };
  };

  getThumbsByProdId = async (prodId) => {
    const checkProdId = await ProductsRepo.findOneById(prodId);
    if (!checkProdId) throw new NotFoundError("prodid is not exist");
    const listThumbs = await ThumbnailsRepo.findByProdId(prodId);
    if (!listThumbs) throw new NotFoundError("khong co thumbs");
    return listThumbs;
  };
}

module.exports = new ThumbnailsService();
