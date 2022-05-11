const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GallerySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    largeImages: {
      type: [String],
      required: true,
      trim: true,
    },
    smallImage: {
      type: String,
      trim: true,
    },
    breed: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    sex: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model("Gallery", GallerySchema);

module.exports = Gallery;
