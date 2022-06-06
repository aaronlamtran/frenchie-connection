const Dog = require("../models/dog-waitlist-model");
const Waitlist = require("../models/waitlist-model");
const HttpStatus = require("http-status-codes");
const { validationResult } = require("express-validator");

const joinWaitlist = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, email, phone } = req.body;
    const dog = await Dog.findOne({ _id: req.params.id });
    if (!dog) {
      return res.status(HttpStatus.NOT_FOUND).json({
        errors: [{ msg: "doggie not found. pls select a different doggie." }],
      });
    }

    const waitlistExists = await Waitlist.findOne({
      dog: req.params.id,
      email,
    });

    if (waitlistExists) {
      const waitlists = await Waitlist.find({ dog: dog._id }).sort({
        refers: "desc",
        waitlistPosition: "asc",
      });

      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        errors: [
          {
            waitlist: waitlistExists,
            waitlists,
            msg: "Looks like you are already on the waitlist. 🐶",
          },
        ],
      });
    }

    const waitlist = await Waitlist.create({
      name,
      email,
      phone,
      dog: dog._id,
      waitlistPosition: dog.waitlist,
    });

    dog.waitlist += 1;
    await dog.save();

    const waitlists = await Waitlist.find({ dog: dog._id }).sort({
      refers: "desc",
      waitlistPosition: "asc",
    });

    return res.json({
      waitlist,
      waitlists,
      msg: "You have joined the waitlist successfully. 🐶 ",
    });
  } catch (err) {
    console.log(err);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      errors: [
        {
          msg: "Something went wrong. Please try again.",
        },
      ],
    });
  }
};

const getDetails = async (req, res) => {
  try {
    const { email } = req.query;
    const waitlist = await Waitlist.findOne({ email });
    if (!waitlist) {
      return res.status(HttpStatus.NOT_FOUND).json({
        errors: [
          {
            msg: "user has not joined the waitlist.",
          },
        ],
      });
    }
    return res.json({
      waitlist,
      msg: "Waitlist details retrieved successfully.",
    });
  } catch (err) {
    console.log(err);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      errors: [
        {
          msg: "Something went wrong. Please try again.",
        },
      ],
    });
  }
};

const deleteWaitlistEntry = async (req, res) => {
  try {
    console.log(req.params)
    const _id = req.params.id;
    const entry = await Waitlist.deleteOne({ _id });
    if (!entry) {
      return res.status(HttpStatus.NOT_FOUND).json({
        errors: [
          {
            msg: "user has not joined the waitlist.",
          },
        ],
      });
    }
    return res.json({
      entry,
      msg: "waitlist entry deleted successfully.",
    });
  } catch (err) {
    console.log(err);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      errors: [
        {
          msg: "Something went wrong. Please try again.",
        },
      ],
    });
  }
};

module.exports = { joinWaitlist, getDetails, deleteWaitlistEntry };
