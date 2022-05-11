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

const removeFromGallery = async (req, res) => {};

const editOne = async (req, res) => {};

module.exports = { addToGallery, removeFromGallery, editOne };
