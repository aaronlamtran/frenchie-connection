const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dogWaitlistSchema = new Schema(
  {
    creatorName: {
      type: String,
      required: true,
      trim: true
    },
    creatorEmail: {
      type: String,
      required: true,
      trim: true
    },
    dogName: {
      type: String,
      required: true,
      trim: true
    },
    dogDescription: {
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

const DogWaitlist = mongoose.model("DogWaitlist", dogWaitlistSchema);

module.exports = DogWaitlist;
