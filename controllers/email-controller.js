const HttpStatus = require("http-status-codes");
// const { validationResult } = require("express-validator");
const axios = require('axios')
require('dotenv').config();
const { EMAIL_SERVER } = process.env;
const pingEmailServer = async (req, res) => {
  try{
    const { data } = await axios.get(EMAIL_SERVER)
    return res.status(HttpStatus.StatusCodes.OK).json({
      result: data,
      success:true
    })
  }
  catch (e){
    console.log("err from email-controller:", e);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      errors: [
        {
          msg: "didnt work try again.",
        },
      ],
    });
  }
}


module.exports = { pingEmailServer }