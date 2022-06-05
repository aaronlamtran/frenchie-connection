const Gallery = require("../models/gallery-model");
const HttpStatus = require("http-status-codes");
const { validationResult } = require("express-validator");

const addToGallery = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, largeImages, smallImage, breed, color, sex } = req.body;
    console.log({ name, largeImages, smallImage, breed, color, sex });
    const gallery = await Gallery.create({
      name,
      largeImages,
      smallImage,
      breed,
      color,
      sex,
    });

    return res.json({ gallery, msg: "gallery listed successfully" });
  } catch (err) {
    console.log(err);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      errors: [
        {
          msg: "didnt work try again.",
        },
      ],
    });
  }
};

const getOne = async (req, res) => {
  try {
    const all = await Gallery.find();
    return res.status(HttpStatus.StatusCodes.OK).json({
      all,
      success: true,
    });
  } catch (e) {
    console.log("err from getOne:", e);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      errors: [
        {
          msg: "didnt work try again.",
        },
      ],
    });
  }
};

const removeFromGallery = async (req, res) => {
  try {
    const gallery = await Gallery.deleteOne({ _id: req.params.id });
    return res.status(HttpStatus.StatusCodes.OK).json({
      gallery,
      success: true,
    });
  } catch (e) {
    console.log("err from remove gallery:", e);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      errors: [
        {
          msg: "didnt work try again.",
        },
      ],
    });
  }
};

const deleteGalleryImages = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndUpdate(
      { _id: req.params.id },
      { largeImages: [] },
      { new: true }
    );
    return res.status(HttpStatus.StatusCodes.OK).json({
      gallery,
      success: true,
    });
  } catch (e) {
    console.log("err from deleteGalleryImages:", e);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      errors: [
        {
          msg: "didnt work try again.",
        },
      ],
    });
  }
};

const updateGalleryImages = async (req, res) => {
  try {
    const { urls } = req.body
    console.log({urls})
    const gallery = await Gallery.findByIdAndUpdate(
      { _id: req.params.id },
      { largeImages: urls },
      { new: true }
    );
    return res.status(HttpStatus.StatusCodes.OK).json({
      gallery,
      success: true,
    });
  } catch (e) {
    console.log("err from deleteGalleryImages:", e);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      errors: [
        {
          msg: "didnt work try again.",
        },
      ],
    });
  }
};
module.exports = {
  addToGallery,
  removeFromGallery,
  getOne,
  deleteGalleryImages,
  updateGalleryImages,
};
