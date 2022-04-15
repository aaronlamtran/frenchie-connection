const Dog = require("../models/dog-waitlist-model");
const Waitlist = require("../models/waitlist-model");
const HttpStatus = require("http-status-codes");
const { validationResult } = require("express-validator");

const createDog = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        success: false,
        errors: errors.array(),
      });
    }
    const { creatorName, creatorEmail, dogName, dogDescription } = req.body;
    console.log({ creatorName });

    const dog = await Dog.create({
      creatorName,
      creatorEmail,
      dogName,
      dogDescription,
    });

    return res.json({ dog, msg: "dog listed successfully." });
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

const allDogs = async (req, res) => {
  try {
    const dogs = await Dog.find().sort({ createdAt: "desc" });
    return res.json({ dogs, msg: "all dogs retrieved successfully." });
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

const singleDog = async (req, res) => {
  try {
    const dog = await Dog.findOne({ _id: req.params.id });
    if (!dog) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        errors: [
          {
            msg: "Dog not found. Please select a different dog.",
          },
        ],
      });
    }

    const waitlists = await Waitlist.find({ dog: dog._id }).sort({
      refers: "desc",
      waitlistPosition: "asc",
    });

    return res.json({
      dog,
      waitlists,
      msg: "dog retrieved successfully.",
    });
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

module.exports = { createDog, allDogs, singleDog };
