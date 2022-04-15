const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const waitlistSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true
    },
    productDescription: {
      type: String,
      required: true,
      trim: true
    },
    waitlist: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Waitlist = mongoose.model("Waitlist", waitlistSchema);

module.exports = Waitlist;
