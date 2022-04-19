const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WaitlistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      // required: true,
      trim: true,
    },
    dog: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    waitlistPosition: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Waitlist = mongoose.model("Waitlist", WaitlistSchema);

module.exports = Waitlist;
